'use strict'

import 'isomorphic-fetch';

import {parse} from 'path';

import { setFetchingPostsStatus,
         setPostContentStatus,
         setPostContent,
         STATUS_FAILED,
         STATUS_SUCCEEDED,
         STATUS_PENDING,
         addPosts } from './index'

import { wrap, assign, property } from 'lodash'

import { PATH_POST,
         pathPost } from '../actions'

import marked from 'marked'

function getBodyText(response){
  return response.text()
}

function parseJson(response){
  return response.json()
}

function transformGithubPost(file){
  let slug = parse(file.path).name.replace(/\s+/g, '-')
  return assign(
    { id: file.path, slug }, file
  );
}

function transformGithubPosts(files){
  return files.map(transformGithubPost);
}

function log(val) {
  console.log(val)
  return val
}

export function fetchPosts(){
  return function(dispatch){
    dispatch( setFetchingPostsStatus(STATUS_PENDING) )
    return fetch('https://api.github.com/repos/midgethoen/blog/contents')
      .then( parseJson )
      .then( transformGithubPosts )
      .then( posts =>{
        // fetch the content of each post
        posts.forEach(post=>dispatch(fetchPostContent(post)))
        return posts
      })
      .then( addPosts )
      .then( dispatch )
      .then( wrap(setFetchingPostsStatus(STATUS_SUCCEEDED), dispatch) )
      .catch( (err)=>{
        dispatch(setFetchingPostsStatus(STATUS_FAILED));
        throw err
      });
  }
}

export function fetchPostContent(post){
  return function(dispatch){
    console.log('fetchPostContent', post)
    dispatch(setPostContentStatus(STATUS_PENDING))
    return fetch(post.download_url)
      .then( getBodyText )
      .then( content=>{
        dispatch(setPostContent(post, content))
        dispatch(setPostContentStatus(post, STATUS_SUCCEEDED))
      })
      .catch( (err)=>{
        dispatch(setPostContentStatus(STATUS_FAILED))
        throw err
      });
  }
}
