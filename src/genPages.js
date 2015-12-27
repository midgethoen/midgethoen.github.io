'use strict'

import { routeReducer, replacePath } from 'redux-simple-router'
import { match, Router, RouterContext, RoutingContext } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { merge, curry, pluck, prepend, tap, pipe, map } from 'ramda'

import { cleanContent } from '../src/cleanContent'
import { fetchContent } from '../src/fetchContent'

import { renderToString } from 'react-dom/server'
import React from 'react'
import { ConnectedRouter, routes } from '../src/components/router'
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
function renderAll(states){
  return Promise.all(map(render, states))
}

function render(state) {
  return new Promise(function(res, rej){
    let store = createStore((x)=>x, state)
    let rs = routes()
    match(
      {routes: rs, location: state.routing.path},
      (err, redir, props)=>{
        let render = renderToString(
          <Provider store={store} >
            <RoutingContext { ...props } >
              { rs }
            </RoutingContext>
          </Provider>
        )
        res({render,state})
      }
    )
  })
}

function writeToDisk(root='www/', args){
  let {state, render} = args
  let filename = path.join(root, state.routing.path)
  if (filename[filename.length-1] == '/'){
    filename += 'index.html'
  }
  fs.writeFileSync(filename, render)
  return filename
}

export default function genPages(dest){
  return function(content){
    return Promise.resolve(content)
    .then(content=>{ return {posts: content} }) // this is the base state
    .then(createRoutes)
    .then(renderAll)
    .then(map((args)=>{
      return writeToDisk(dest, args)
    }))
  }
}
