'use strict'

export const ADD_POSTS = 'ADD_POSTS'
export const SET_POST_CONTENT = 'SET_POST_CONTENT'
export const SET_POST_CONTENT_STATUS = 'SET_POST_CONTENT_STATUS'

export function addPosts(posts){
  return {
    type: ADD_POSTS,
    posts: posts
  }
}


export const SET_FETCHING_POSTS_STATUS = 'SET_FETCHING_POSTS_STATUS'
export const STATUS_INACTIVE   = 'STATUS_INACTIVE'
export const STATUS_PENDING    = 'STATUS_PENDING'
export const STATUS_SUCCEEDED  = 'STATUS_SUCCEEDED'
export const STATUS_FAILED     = 'STATUS_FAILED'

export function setFetchingPostsStatus(status){
  return {
    type: SET_FETCHING_POSTS_STATUS,
    status: status
  }
}

export function setPostContent(post, content) {
  return {
    type: SET_POST_CONTENT,
    content: content,
    id: post.id,
  }
}

export function setPostContentStatus(post, contentStatus) {
  return {
    type: SET_POST_CONTENT_STATUS,
    contentStatus: contentStatus,
    id: post.id,
  }
}
