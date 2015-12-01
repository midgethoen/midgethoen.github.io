'use strict'

import * as React from 'react'
import { find, property } from 'lodash'
import { connect } from 'react-redux'
import { fetchPostContent } from '../actions/postActions'
import { STATUS_INACTIVE,
  STATUS_SUCCEEDED } from '../actions'
import Markdown from './Markdown'

const { PropTypes } = React

const Post = React.createClass({
  propTypes: {
    post: PropTypes.object.isRequired
  },
  render: function(){
    let {slug, content, contentStatus} = this.props.post

    if (contentStatus == STATUS_SUCCEEDED){
      return <article>
        <Markdown>{ content }</Markdown>
        </article>
    } else {
      return <p>{ contentStatus}</p>
    }
  }
})

function selectPost(state) {
  return {
    post: find(state.posts, {slug: state.router.params.slug})
  }
}

export default connect(selectPost)(Post)
