import replay from 'Replay'
replay.fixtures = __dirname + '/fixtures'
import sinon from 'sinon'
import chai from 'chai'
let {expect} = chai

import { 
  fetchPostList,
  fetchPostContent,
  fetchPostCommits,
  fetchPostMeta,
  fetchContent
} from '../src/fetchContent'


before(function(){
  console.log("\u001b[2J\u001b[0;0H");
})

beforeEach(function(){
  sinon.spy(global, 'fetch')
});

afterEach(function(){
  global.fetch.restore();
});

describe('fetchPostList', function(){
  it('should request posts from github', function(){
    let repo = 'midgethoen/blog'
    return fetchPostList(repo)
      .then(result=>{
        // did perform proper request
        let url = "https://api.github.com/repos/midgethoen/blog/contents/posts/"
        expect(fetch.calledOnce).to.be.true
        expect(fetch.args[0][0]).to.be.equal(url)
        // returns proper result
        expect(result).to.be.instanceOf(Array)
        expect(result[0]).to.be.instanceOf(Object)
        expect(result[0]).to.contain.keys('name','path','sha')
        expect(result.map).to.be.a('function')
      })
  });
});

describe('fetchPostContent', function(){
  it('should request Post content for a listing', function(){
    let repo = 'midgethoen/blog'
    let post = {
      download_url: 'https://raw.githubusercontent.com/midgethoen/blog/master/posts/helloworld.md'
    }
    return fetchPostContent(post).then(result=>{
      expect(fetch.calledOnce).to.be.true
    })
  });
});

describe('fetch post content', function(){
  it('should fetch content for post\'s path', function(){
     return fetchPostContent(
       {download_url:'https://raw.githubusercontent.com/midgethoen/blog/master/helloworld.md'}
     )
     .then(res=>{
        expect(fetch.calledOnce).to.be.true
        expect(res).to.be.a('object')
        expect(res).to.contain.key('content')
        expect(res.content).to.be.a('string')
     })
  });
});

describe('fetch post commits', function(){
  it('should fetch commits for post\'s path', function(){
    return fetchPostCommits('midgethoen/blog', {path:'posts/helloworld.md'})
    .then(res=>{
      expect(fetch.calledOnce).to.be.true
      expect(fetch.args[0][0]).to.be.equal(
        'https://api.github.com/'+
        'repos/midgethoen/blog/commits'+
        '?path='+encodeURIComponent('posts/helloworld.md')
      )
      expect(res).to.be.a('object')
      expect(res).to.have.keys('path', 'commits')
      expect(res.commits).to.be.a('array')
      expect(res.commits[0]).to.contain.keys('sha', 'url')
    })
  });
});

describe('fetchContent', function(){
  it('should return a promise', function(){
    var res = fetchContent('bogus')
    expect(res).to.be.a('promise')
  });
});


