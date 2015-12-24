'use strict'

import * as React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { identity } from 'lodash'
const { PropTypes } = React

import { fetchPosts } from '../actions/postActions'

const PostList = ({posts})=>{
  return <ul>
      {
        posts.map((post)=>{
          return <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>
              {post.path}
            </Link>
          </li>
          })
      }
    </ul>
}

const NoPosts = ()=>{
  return <div>no posts.. :(</div>
}

const PostListing = React.createClass({
  propTypes: {
    posts: PropTypes.array.isRequired
  },
  render: function(){
    let {posts, dispatch} = this.props
    let dispatchFetchPosts = (...args)=> dispatch(fetchPosts(...args))
    let content = posts.length ? <PostList posts={posts}/> : <NoPosts/>
    return <div>
      { content }
      <button onClick={dispatchFetchPosts}>fetch posts</button>
    </div>
  }
})

export default connect(identity)(PostListing)
