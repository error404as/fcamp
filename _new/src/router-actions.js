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
      postId: next.params.postId
    });
  },
  onTag(next){
    store.dispatch({
      type: 'GET_TAG',
      tagId: next.params.tagId
    });
  },
  getTags(){
    store.dispatch({
      type: 'GET_TAGS'
    });
  },
};
