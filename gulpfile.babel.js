'use strict'
import gulp                   from 'gulp'
import {log}                  from 'gulp-util'

import  sass                  from 'gulp-sass'
import connect                from 'gulp-connect'
import open                   from 'gulp-open'

import { memoize, join, pipe,
         filter, test, keys,
         forEach, tap  }       from 'ramda'
// import ps                     from 'promise-streams'
import { writeFile } from 'fs'
import { fetchContent }       from './src/fetchContent'


// record api responses to avoid exceeding api request limit
import replay from 'Replay'
replay.fixtures = __dirname + '/scripts/fixtures'

// this is amazing
const memoizedFetchContent = memoize(fetchContent)
gulp.task('gen-pages', ()=>{
  var genPages = require('./src/genPages').default
  return memoizedFetchContent('midgethoen/blog')
    .then( tap( (state) => { writeFile(
      'www/state.json', JSON.stringify(state, null, 2), ()=>{ console.log('State written') }
    )}))
    .then( genPages('www'))
    .then(join(', '))
    .then(log.bind(undefined, 'Generated pages:'))
    .catch(console.error.bind(error, 'Iiieee:'))
})

gulp.task('clear-require-cache', (done)=>{
  pipe(
    keys,
    filter(test(new RegExp(__dirname + '/src'))),
    forEach((key)=>{
      delete require.cache[key]
    })
  )(require.cache)
  done()
})

gulp.task('css', ()=>{
  return gulp.src('css/*.sass')
    .pipe(sass({includePaths:'node_modules'}))
    .pipe(gulp.dest('www'))
})

gulp.task('watch', ()=>{
  gulp.watch(
      'src/**/*',
      gulp.series(
        'clear-require-cache',
        'gen-pages',
        reload
      ))
  gulp.watch(
    'css/**/*',
    gulp.series('css', reload)
  )
})

function reload() {
  return gulp.src('./').pipe(connect.reload())
}

gulp.task('open-browser', (done)=>{
  gulp.src('*').pipe(
    open({
      uri: 'http://localhost:9001/'
    })
  )
  done()
})

gulp.task('webserver', (done)=>{
  connect.server({
    livereload: true,
    port: 9001,
    root: ['www']
  })
  done()
})


gulp.task('serve', gulp.series([
  'gen-pages',
  'webserver',
  'open-browser',
  'watch'
]))
