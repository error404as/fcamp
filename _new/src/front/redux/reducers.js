import {combineReducers} from 'redux';
import actions from './actions';
import store from './index';

/*

  type: 'all',
  posts: [],
  tags: [],
  pageId: '',
  singlePost: {}

*/

var type = (state='', action) => {
  switch (action.type) {
    case 'GET_POST':
      actions.getPost(action.value, function(data){
        store.dispatch({ type: 'GET_POST_Result', value: data });
      });
      return 'single';
    case 'GET_POSTS':
      actions.getPosts(function(data){
        store.dispatch({ type: 'GET_POSTS_Result', value: data });
      });
      return 'all';
    case 'GET_TAG':
      actions.getTag(action.value, function(data){
        store.dispatch({ type: 'GET_TAG_Result', value: data });
      });
      return 'tag';
    default:
      return state;
  }
}

var posts = (state=[], action) => {
  switch (action.type) {
    case 'GET_POSTS':
    case 'GET_TAG':
      return [];
    case 'GET_POSTS_Result':
    case 'GET_TAG_Result':
      return action.value;
    default:
      return state;
  }
}

var tags = (state=[], action) => {
  switch (action.type) {
    case 'GET_TAGS':
      actions.getTags(function(data){
        store.dispatch({ type: 'GET_TAGS_Result', value: data });
      });
      return [];
    case 'GET_TAGS_Result':
      return action.value;
    default:
      return state;
  }
}

var pageId = (state='', action) => {
  switch (action.type) {
    case 'GET_POST':
    case 'GET_TAG':
      return action.value;
    default:
      return state;
  }
}

var singlePost = (state={}, action) => {
  switch (action.type) {
    case 'GET_POST':
      return {};
    case 'GET_POST_Result':
      return action.value;
    default:
      return state;
  }
}

export default combineReducers({
    type,
    posts,
    tags,
    pageId,
    singlePost
})
