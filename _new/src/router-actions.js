import store from './redux';

export default {
  onIndex(){
    store.dispatch({
      type: 'GET_POSTS'
    });
  },
  onArticle(next){
    store.dispatch({
      type: 'GET_POST',
      value: next.params.postId
    });
  },
  onTag(next){
    store.dispatch({
      type: 'GET_TAG',
      value: next.params.tagId
    });
  },
  getTags(){
    store.dispatch({
      type: 'GET_TAGS'
    });
  },
};
