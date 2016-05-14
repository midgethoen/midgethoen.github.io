import {
  Route,
  IndexRoute,
  Router,
  RoutingContext,
  match
} from 'react-router'

import React from 'react'
//import { BrowserHistory } from 'react-router/lib/BrowserHistory'
import { createHistory } from 'history'

let A = ()=><h1>AAA</h1>
let B = ()=><h1>BBB</h1>

let routes =
  <Route path='/'>
    <IndexRoute component={ A }/>
    <Route path='a' component={ A } />
    <Route path='b' component={ B } />
  </Route>

import { renderToString } from 'react-dom/server'


match({routes, location: '/b'}, (err, redirect, props)=>{
  console.log(
     renderToString(
       <RoutingContext {...props} >
         {routes}
       </RoutingContext>
    )
  )
})
