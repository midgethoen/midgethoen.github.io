'use strict'

import * as React from 'react'
import {pick, merge, find, propEq} from 'ramda'
import { connect } from 'react-redux'
import { fetchPostContent } from '../actions/postActions'
import { STATUS_INACTIVE,
  STATUS_SUCCEEDED } from '../actions'
import Markdown from './Markdown'
import jsonPretty from 'json-pretty'

const { PropTypes } = React

const Post = React.createClass({
  propTypes: {
    post: PropTypes.object.isRequired
  },
  render: function(){
    let post = this.props.post
    return <article>
      <Markdown>{ post.content }</Markdown>
    </article>
  }
})


/*
 * select the post using current state and route params
 */
const selectFields = pick(['posts', 'params'])
export default connect(
  selectFields,
  selectFields,
  (state, dispatch, own)=>{
    return {
      post: find(propEq('slug', own.params.slug), state.posts)
    }
  }
)(Post)
