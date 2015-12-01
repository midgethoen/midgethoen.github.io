import {ADD_POSTS} from '../actions'
import {fetchPostContent} from '../actions/postActions'

export default function postContentMiddleware(store) {
  return function(next) {
    return function(action) {
      console.log('pcm', action)
      if (action.type == ADD_POSTS){
        action.posts.forEach((post)=>{
          console.log('next fetchPostContent', fetchPostContent(post))
          store.dispatch(fetchPostContent(post));
        })
      }
      return next(action)
    }
  }
}
