import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux';
import App from './components/App.jsx';
//import { Provider } from 'react-redux';

document.querySelector('.logo a').addEventListener('click',function(e){
  e.preventDefault();
  store.dispatch({
    type: 'GET_POSTS'
  })  
}, true);


ReactDOM.render(
  //<Provider store={store}>
    <App />
  //</Provider>
  ,
  document.getElementById('app')
);

