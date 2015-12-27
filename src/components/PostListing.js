'use strict'

import * as React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { identity } from 'lodash'
const { PropTypes } = React
import { pick } from 'ramda'

import { fetchPosts } from '../actions/postActions'

const PostList = ({posts})=>{
  return <ul>
      {
        posts.map((post)=>{
          return <li key={post.slug}>
            <Link to={`posts/${post.slug}.html`}>
              {post.title}
            </Link>
          </li>
          })
      }
    </ul>
}

const PostListing = React.createClass({
  propTypes: {
    posts: PropTypes.array.isRequired
  },
  render: function(){
    let {posts, dispatch} = this.props
    let dispatchFetchPosts = (...args)=> dispatch(fetchPosts(...args))
    return <div>
      <PostList posts={posts}/>
    </div>
  }
})


export default connect(
  pick(['posts'])
)(PostListing)
