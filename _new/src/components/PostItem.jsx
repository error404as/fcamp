import React from 'react';
import store from '../redux';
import moment from 'moment';

var PostItem = React.createClass({
  clickHandler(e){
    e.preventDefault();

    store.dispatch({
      type: 'GET_POST',
      postId: this.props.post.permalink
    });
  },
  render() {
    return (
      <div className={'post-item' + (this.props.post.image ? '' : ' no-image')}>
        <a href={'/article/'+this.props.post.permalink} onClick={this.clickHandler}>
          {this.props.post.image && 
            <div className="vis"><img src={this.props.post.image} alt={this.props.post.headline} /></div>
          }
          
          <div className="info">
            <div className="headline">{this.props.post.headline}</div>
            <div className="meta">{moment(this.props.post.created).format('YYYY-MM-DD')}</div>
          </div>
        </a>
      </div>
    );
  }
});

export default PostItem;
