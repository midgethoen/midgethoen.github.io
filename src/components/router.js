'use strict';
import React from 'react'

import {
  reduxReactRouter,
  routerStateReducer,
} from 'redux-simple-router'

import { Provider } from 'react-redux'

import {
  Route,
  IndexRoute,
  Router
} from 'react-router'

import App from './App'
import PostListing from './Postlisting'
import Post from './Post'

export const routes = ()=>{
    return <Route path='/' component={App}>
      <IndexRoute component={PostListing}/>
      <Route path='/posts/:slug' component={Post}/>
    </Route>
}

export const ConnectedRouter = (store)=>
  <div>
    <Provider store={store}>
      <Router>
        { routes() }
      </Router>
    </Provider>
  </div>


