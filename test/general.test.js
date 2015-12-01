'use strict'
import * as chai from 'chai'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {postReducer} from '../src/reducers'

chai.should()

describe('React', ()=>{
  it('is imported', ()=>{
    React.should.be.a('object')
  });
  it('renders stuff', ()=>{
    let elem = <h1>test</h1>
    let render = ReactDOMServer.renderToString( elem )
    render.should.be.a.string
    render.should.match(/<h1[^>]*>test<\/h1>/)
  });
});

describe('postReducer',()=>{
  it('should return the state by default', ()=>{
    let id = {}
    let result = blog.postReducer(id, undefined)
    result.should.be.equal(id)
    result.should.not.be.equal({})
  })

  it('should add posts',()=>{
    let state = [{}]
    let result = blog.postReducer(state, action)
    result.should.not.be.equal(state)
    result.should.have.length(2)
    result[0].should.be.equal(state[0])
    result[1].should.be.equal(action.post)
  })
})
