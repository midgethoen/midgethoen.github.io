'use strict';
import React from 'react'

import {
  reduxReactRouter,
  routerStateReducer,
  ReduxRouter 
} from 'redux-simple-router'

import {
  Route,
  IndexRoute
} from 'react-router'

import App from './App'
import PostListing from './Postlisting'
import Post from './Post'

export const routes = ()=>{
    <Route path='/' 
      component={App}>
      <IndexRoute component={PostListing}/>
      <Route path='/posts/:slug' 
        component={Post}/>
    </Route>
}

export const ConnectedRouter = (store)=>
  <div>
    <Provider store={store}>
      <ReduxRouter>
        { routes() }
      </ReduxRouter>
    </Provider>
  </div>


