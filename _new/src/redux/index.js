import { createStore } from 'redux';
import actions from './actions';

var initState = {
  type: 'all',
  posts: [],
  tags: [],
  pageId: '',
  singlePost: {}
};

var reducer = function(state, action) {
  switch (action.type) {
    case 'GET_POST_Result': 
      return Object.assign(state, {singlePost: action.data})
    case 'GET_POST':
      actions.getPost(action.postId, function(data){
      	store.dispatch({ type: 'GET_POST_Result', data: data });
      });
      return Object.assign(state, {type: 'single', singlePost: {}, pageId: action.postId});

    case 'GET_POSTS_Result': 
      return Object.assign(state, {posts: action.data})
    case 'GET_POSTS':
      actions.getPosts(function(data){
        store.dispatch({ type: 'GET_POSTS_Result', data: data });
      });
      return Object.assign(state, {type: 'all', posts: []});

    case 'GET_TAGS_Result': 
      return Object.assign(state, {tags: action.data})
    case 'GET_TAGS':
      actions.getTags(function(data){
        store.dispatch({ type: 'GET_TAGS_Result', data: data });
      });
      return state;

    case 'GET_TAG_Result': 
      return Object.assign(state, {posts: action.data})
    case 'GET_TAG':
      actions.getTag(action.tagId, function(data){
      	store.dispatch({ type: 'GET_TAG_Result', data: data });
      });
      return Object.assign(state, {type: 'tag', posts: [], pageId: action.tagId});
      
    default:
      return state;
  }
}

var store = createStore(reducer, initState);

export default store;