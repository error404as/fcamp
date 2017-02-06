import { createStore } from 'redux';
import reducers from './reducers';

var initState = {
  type: 'all',
  posts: [],
  tags: [],
  pageId: '',
  singlePost: {}
};

var store = createStore(reducers, initState);

export default store;