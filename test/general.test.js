'use strict'
import * as chai from 'chai'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {postsReducer} from '../src/reducers'
let expect = chai.expect

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
    let result = postsReducer(id, undefined)
    result.should.be.equal(id)
    result.should.not.be.equal({})
  })
})

describe('promise', function(){
  it('should map collecion of promises', function(){
    function retVal(val){
      return new Promise((res, rej)=>{
        setTimeout(function(){res(val)}, 5)
      })
    }
    function square(x){
      return x*x
    }
    return Promise.all( [1,2,3].map(retVal) )
      .then(res=>{
        return res.map( square )
      }).then(res=>{
      expect(res).to.deep.equal([1,4,9])
    })
  });
});
