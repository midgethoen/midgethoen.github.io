import 'isomorphic-fetch'
import { curry, merge, __ } from 'ramda'
import { cleanContent } from './cleanContent'
const API_HOST = 'https://api.github.com'

function getText(response) {
  return response.text()
}

function parseJson(response) {
  return response.json()
}

const postListingUrl = repo =>
  `${API_HOST}/repos/${repo}/contents/posts/`

const postCommitsUrl = (repo, path) => { 
  let encodedPath = encodeURIComponent(path)
  return `${API_HOST}/repos/${repo}/commits?path=${encodedPath}`
}

export function fetchPostList(repo){
  let url = postListingUrl(repo)
  return fetch(url).then(parseJson)
}

export function fetchPostContent(post){
  return fetch(post.download_url)
    .then( getText )
    .then( content => merge(post, {content}) )
}

export function fetchPostCommits(repo, post){
  let url = postCommitsUrl(repo, post.path)
  return fetch(url)
    .then(parseJson)
    .then(curry(addCommitsToPost)(post))
}

export function addCommitsToPost(post, commits){
  return merge(post, {commits})
}

export function fetchContent(repo){
  return fetchPostList(repo)
  .then( posts=>{
    let promises = posts
      .map((post)=>{
        return fetchPostContent(post)
        .then(curry(fetchPostCommits)(repo))
      })
    return Promise.all( promises ).then(cleanContent)
  })
}
