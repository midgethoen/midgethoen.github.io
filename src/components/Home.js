'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { createTeaser } from '../logic'
import { PostListing } from './PostListing'
import { fetchPosts } from '../actions/postActions'
import { last, pick, pipe, evolve, map } from 'ramda'

const Home = ({posts})=>{
  return <div>
    <PostListing posts={posts} />
  </div>
}

export default connect((
  pick(['posts']),
  evolve({posts: map(createTeaser)})
))(Home)
