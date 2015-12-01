'use strict'

import { ADD_POSTS, 
         SET_POST_CONTENT,
         SET_POST_CONTENT_STATUS} from '../actions'
import { STATUS_INACTIVE, 
         SET_FETCHING_POSTS_STATUS } from '../actions'
import { assign } from 'lodash'

const postDefaults = {
  contentStatus: STATUS_INACTIVE,
}
function post(values) {
  return assign({}, postDefaults, values)
}

export function postsReducer(state, action){
  if (!state){
    state = []
  }
  if (!action){
    return state
  }
  let {id, content, contentStatus,  type} = action
  switch (type) {
    case ADD_POSTS:
      return action.posts.map(post)

    case SET_POST_CONTENT:
      return state.map((post)=>{
        if (post.id == id){
          return assign({}, post, { content })
        } else{
          return post
        }
      })

    case SET_POST_CONTENT_STATUS:
      return state.map((post)=>{
        if (post.id == id){
          return assign({}, post, { contentStatus })
        } else{
          return post
        }
      })

    default:
      return state
  }
}


export function fetchingStatusReducer(state, action){
  if (!state){
    state = STATUS_INACTIVE
  }
  if (!action) {
    return state
  }
  switch (action.type){
    case SET_FETCHING_POSTS_STATUS:
      return assign({}, state, {status: action.status})
      break

    default:
      return state
  }
}
