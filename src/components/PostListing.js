'use strict'

import * as React from 'react'
import { Link } from 'react-router'
const { PropTypes } = React
import Markdown from './markdown'
import { last } from 'ramda'

export const PostListing = ({posts})=>{
  return <div>
      {
        posts.map((post)=>{
          return <article key={post.slug} className="col-xs-12">
            <Date className="postDate" >{ last(post.commits).author.date }</Date>
            <h2><Link to={`posts/${post.slug}.html`}>{ post.title }</Link></h2>
            <Link className="teaser" to={`posts/${post.slug}.html`}>
              <Markdown>{ post.teaser }</Markdown>
            </Link>
          </article>
        })
      }
    </div>
}

function Date(props){
  return <span {...props} >
    { props.children.toDateString() }
  </span>
}
