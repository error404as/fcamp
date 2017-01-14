import React from 'react';
import store from '../redux';
import Article from './Article.jsx';
import PostItem from './PostItem.jsx';
//import { connect } from 'react-redux';


var App = React.createClass({
  getInitialState() {
    return store.getState()
  },
  componentDidMount() {
    store.dispatch({
      type: 'GET_POSTS'
    })
    store.subscribe(() =>
      this.setState(store.getState())
    )
  },
  render() {
    if(this.state.type === 'all'){
      var content = this.state.posts.map((itm)=>{
        return <PostItem post={itm} />
      })
      return (
        <div className="posts-list">
            {content}
        </div>
      );
    } else if(this.state.type === 'single'){
      return (
        <Article post={this.state.singlePost} />
      );
    }
    return <div></div>;
  }
});
//App = connect()(App)

export default App;