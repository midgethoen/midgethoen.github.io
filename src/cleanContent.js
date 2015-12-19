"use strict"
import {
  pipe,
  lensProp,
  keys,
  over,
  map,
  pick,
  set,
  merge,
  mergeAll,
  omit,
  curry,
  tap
} from 'ramda'

var author, committer, message

const from = [
  {
    name: "stuff-and-things.md",
    sha: "",
    html_url: "",
    content: "<!-- { title: \"Stuff and things\", tags:[], categories: []} -->/n # A long time ago", // markdown
    commits: [
      {
        commit: {
          author,
          committer,
          message,
        },
        html_url: '',
        author: {
          login: '',
          avatar_url: '',
          url:''
        },
        committer: {
          login: '',
          avatar_url: '',
          url: ''
        },
      }
    ]
  }
]

const to = [
  {
    title: "Stuff and things",
    sha: "",
    url: "",
    content: "# A long time ago",
    tags: [],
    categories: [],
    commits:[
      {
        sha: '',
        author:{
          login:'',
          email: '',
          url: '',
          avatar_url: '',
        },
        committer: {
          login:'',
          email: '',
          url: '',
          avatar_url: '',
        },
        message,
        url: ''
      }
    ]
  }
]

const filenameToTitle = (filename)=>{
  var title = filename
    .replace(/\..*$/,'')
    .replace(/(-|_)/, ' ')
    .trim()
  return title[0].toUpperCase() + title.slice(1)
}


const titleFromName = (post)=>{
  return merge(post, {title: filenameToTitle(post.name)});
}

const renameProp = curry((oldName, newName, obj)=>{
  return merge(
    omit([oldName], obj),
    { [newName]: obj[oldName] }
  )
})

/*
 * If post.content starts with
 * a valid json object in a html comment.
 * parse the object and apply it to the post
 */
const extractAndApplyMetaHeader = (post)=>{
  let meta = post.content.match(/\s*<!--[\s\S]*-->/)
  try {
    if (meta){
      meta = meta[0].trim().replace(/(<!--\s*|\s*-->)/g,'')
      meta = JSON.parse(meta)
    }
  } catch (err){
    console.warn(
      'Found something like a meta header but could not parse it ?! (' + err.message + ')'
    )
    return post;
  }
  return mergeAll([
    post,
    {content: post.content.replace(/\s*<!--[\s\S]*-->[\s\n]*/, '')},
    meta || {}
  ])
}

export const cleanCommit = commit => {
  return pipe(
    over(lensProp('author'), pipe(
      merge(commit.commit.author),
      pick(keys(to[0].commits[0].author))
    )),
    over(lensProp('committer'), pipe(
      merge(commit.commit.commiter),
      pick(keys(to[0].commits[0].author))
    )),
    renameProp('html_url', 'url'),
    set(lensProp('message'), commit.commit.message),
    pick(keys(to[0].commits[0]))
  )(commit)
}

export const cleanContent = map(pipe(
  titleFromName,
  over(lensProp('commits'), map(cleanCommit)),
  renameProp('html_url', 'url'),
  pick(keys(to[0])),
  extractAndApplyMetaHeader
))
