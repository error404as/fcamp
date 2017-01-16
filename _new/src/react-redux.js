import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux';
import App from './components/App.jsx';
import Article from './components/Article.jsx';
import actions from './router-actions';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

document.querySelector('.logo a').addEventListener('click',function(e){
  e.preventDefault();
  browserHistory.push('/');
}, true);

actions.getTags();

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={App} onEnter={ actions.onIndex } />
      <Route path="article/:postId" component={Article} onEnter={ actions.onArticle } />
      <Route path="tag/:tagId" component={App} onEnter={ actions.onTag } />
    </Route>
  </Router>
), document.getElementById('app'))
