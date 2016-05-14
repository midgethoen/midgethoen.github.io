'use strict'

import {merge} from 'ramda'

const taggedTeaserRegex = /\n\s*\<\!--\s*teaser\s*--\>/i
const autoTeaserRegex = /\n\n/

export function createTeaser(post) {
  if (taggedTeaserRegex.test(post.content)){
    let teaser = post.content.split(taggedTeaserRegex)[0]
    post = merge(post, {teaser})
  } else if (autoTeaserRegex.test(post.content)){
    let teaser = post.content.split(autoTeaserRegex)[0]
    post = merge(post, {teaser})
  }
  return post
}
