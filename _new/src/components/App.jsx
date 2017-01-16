import React from 'react';
import store from '../redux';
import Article from './Article.jsx';
import PostItem from './PostItem.jsx';
import TagsList from './TagsList.jsx';
import Loader from './Loader.jsx';

var App = React.createClass({
  getInitialState() {
    return store.getState()
  },
  componentDidMount() {
    store.subscribe(() =>
      this.setState(store.getState())
    )
  },
  render() {
    return <div className="main">
      <div className="content">
        {this.state.type === 'all' &&
          <div className="posts-list">
            {this.state.posts.map((itm)=>{
              return <PostItem key={itm.permalink} post={itm} />
            })}
            {!this.state.posts.length &&
              <Loader />
            }
          </div>
        }
        {this.state.type === 'tag' &&
          <div className="posts-list">
            <h1>{this.state.pageId}</h1>
            {this.state.posts.map((itm)=>{
              return <PostItem key={itm.permalink} post={itm} />
            })}
            {!this.state.posts.length &&
              <Loader />
            }
          </div>
        }
        {this.state.type === 'single' &&
          <Article post={this.state.singlePost} />
        }
      </div>
      <aside className="sidebar">
        <TagsList tags={this.state.tags} />
      </aside>
    </div>;
  }
});

export default App;