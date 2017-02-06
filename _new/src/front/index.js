import React from 'react';
import App from './components/App.js';
import Article from './components/Article.js';
import actions from './router-actions';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

// custom handler :)

if(document.getElementById('app')){
	document.querySelector('.logo a').addEventListener('click',function(e){
	  e.preventDefault();
	  browserHistory.push('/');
	}, true);

	render((
	  <Router history={browserHistory}>
	    <Route path="/" component={App}>
	      <IndexRoute component={App} onEnter={ actions.onIndex } />
	      <Route path="article/:postId" component={Article} onEnter={ actions.onArticle } />
	      <Route path="tag/:tagId" component={App} onEnter={ actions.onTag } />
	    </Route>
	  </Router>
	), document.getElementById('app'))
	
}
