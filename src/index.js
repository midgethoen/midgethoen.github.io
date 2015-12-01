'use strict'

import * as React               from 'react'
import * as ReactDOM            from 'react-dom'
import { createStore,
         combineReducers,
         compose,
         applyMiddleware}       from 'redux'
import thunk                    from 'redux-thunk';
import { Provider, connect }    from 'react-redux'
import { reduxReactRouter,
         routerStateReducer,
         ReduxRouter }          from 'redux-router'
import { Route , IndexRoute}    from 'react-router'
import { pick,
         identity,
         wrap,
         assign }               from 'lodash'
import { createHistory }        from 'history'

import { devTools,
         persistState }         from 'redux-devtools';
import { DevTools,
         DebugPanel,
         LogMonitor }           from 'redux-devtools/lib/react';

import { postsReducer,
         fetchingStatusReducer} from './reducers'
import { fetchPosts }           from './actions/postActions'

import App                      from './components/App'
import PostListing              from './components/PostListing'
import Post                     from './components/Post'
import postContentMiddleware    from './middleware/postContentMiddleware'

const createStoreWithMiddleware = compose(
  reduxReactRouter({createHistory}),

  applyMiddleware(thunk),
  //applyMiddleware(postContentMiddleware),

  // devstuff
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

const reducers = combineReducers({
  router         : routerStateReducer,
  posts          : postsReducer,
  fetchingStatus : fetchingStatusReducer,
})

const store = createStoreWithMiddleware(reducers)

export const root =
  <div>
    <Provider store={store}>
      <ReduxRouter>
        <Route path='/' component={App}>
          <IndexRoute component={PostListing}/>
          <Route path='/posts/:slug' component={Post}/>
          <Route path='/posts/:slug/:part' component={Post}/>
        </Route>
      </ReduxRouter>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} select={state => state} monitor={LogMonitor} />
    </DebugPanel>
  </div>

ReactDOM.render(
  root,
  document.getElementById('app')
)
