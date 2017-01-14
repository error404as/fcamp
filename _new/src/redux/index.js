import { createStore } from 'redux';
import actions from './actions';

var initState = {
  type: 'all',
  posts: [],
  singleId: '',
  singlePost: {}
};

var reducer = function(state, action) {
  switch (action.type) {
    case 'GET_POST_Result': 
      return Object.assign(state, {type: 'single', singlePost: action.data, singleId: action.data.permalink})
    case 'GET_POST':
      actions.getPost(action.postId, function(data){
      	store.dispatch({ type: 'GET_POST_Result', data: data });
      });
      return state;

    case 'GET_POSTS_Result': 
      return Object.assign(state, {type: 'all', posts: action.data})
    case 'GET_POSTS':
      actions.getPosts(function(data){
      	store.dispatch({ type: 'GET_POSTS_Result', data: data });
      });
      return state;
      
    default:
      return state;
  }
}

var store = createStore(reducer, initState);

export default store;