'use strict'
import replay from 'Replay'
console.log('path', __dirname + '/fixtures')
replay.fixtures = __dirname + '/fixtures'


import { routeReducer, replacePath } from 'redux-simple-router'
import { RoutingContext } from 'react-router'
import { merge, curry, pluck, prepend, tap, pipe, map } from 'ramda'

import { cleanContent } from '../src/cleanContent'
import { fetchContent } from '../src/fetchContent'

import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { routes } from '../src/components/router'
import fs from 'fs'
import path from 'path'

const createRoutedState = curry( (state, route) => {
  return merge(
    state,
    {routing: routeReducer(undefined, replacePath(route))}
  );
})

const postRoutes = state => pipe(
    pluck('slug'),
    map(createRoutedState(state))
  )(state.posts)

function createRoutes(state) {
    let routes =  pipe(
      pluck('slug'),
      map(slug=>'/posts/'+slug)
    )(state.posts)

    routes.push('/')

    return map(createRoutedState(state), routes)
}

function render(state) {
  console.log(RoutingContext)
  let render = ReactDOMServer.renderToString(
    React.createElement(RoutingContext, state, routes())
  )
  return {
    render,
    state
  }
}

function writeToDisk(args){
  const root = '../www/'
  let {state, render} = args
  let filename = path.join(__dirname, root, state.routing.path)
  if (filename[filename.length-1] == '/'){
    filename += 'index.html'
  } else {
    filename += '.html'
  }
  console.log('writing to', filename)
  fs.writeFileSync(filename, render)
  return true //blegh
}

fetchContent('midgethoen/blog')
  .then(cleanContent)
  .then(content=>{ return {posts: content} }) // this is the base state
  .then(createRoutes)
  .then(map(render))
  .then(tap(console.log))
  .then(map(writeToDisk))
  .then( ()=>{
    //say yay!
    console.log('Yay!')
  })
  .catch(err=>console.log(err.message, err.stack))

