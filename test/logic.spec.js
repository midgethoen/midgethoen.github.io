'use strict'

import { createTeaser } from '../src/logic'
import chai from 'chai'
chai.should()

describe('create teaser', function(){
  it('should add a teaser if there is a tag', function(){
    var post = { content: '1\n2\n3\n   <!-- Teaser  -->\n4\n5'}

    var result = createTeaser(post)

    result.should.have.property('teaser', '1\n2\n3')
  })
})
