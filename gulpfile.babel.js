'use strict'
import gulp                   from 'gulp'
import {log}                  from 'gulp-util'

import connect                from 'gulp-connect'
import open                   from 'gulp-open'

import { memoize, join, pipe,
         filter, test, keys,
         forEach, tap }            from 'ramda'
import ps                     from 'promise-streams'

import { fetchContent }       from './src/fetchContent'


// record api responses to avoid exceeding api request limit
import replay from 'Replay'
/* jshint node: true */
replay.fixtures = __dirname + '/scripts/fixtures'

// this is amazing
const memoizedFetchContent = memoize(fetchContent);
gulp.task('gen-pages', ()=>{
  var genPages = require('./src/genPages').default
  return memoizedFetchContent('midgethoen/blog')
    .then( genPages('www'))
    .then(join(', '))
    .then(log.bind(undefined, 'Generated pages:'))
});

gulp.task('clear-require-cache', (done)=>{
  pipe(
    keys,
    filter(test(new RegExp(__dirname + '/src'))),
    forEach((key)=>{
      console.log('key', key)
      delete require.cache[key]
    })
  )(require.cache)
  done()
})

gulp.task('watch', ()=>{
  return gulp.watch(
    'src/**/*',
    gulp.series(
      'clear-require-cache',
      'gen-pages',
      reload
    )
  );
});

function reload() {
  return gulp.src('./').pipe(connect.reload())
}

gulp.task('open-browser', (done)=>{
  gulp.src('*').pipe(
    open({
      uri: 'http://localhost:9001/'
    })
  );
  done();
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
