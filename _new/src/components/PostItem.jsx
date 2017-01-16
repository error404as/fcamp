import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

var PostItem = React.createClass({
  render() {
    return (
      <div className={'post-item' + (this.props.post.image ? '' : ' no-image')}>
        <Link to={`/article/${this.props.post.permalink}`}>
          {this.props.post.image && 
            <div className="vis"><img src={this.props.post.image} alt={this.props.post.headline} /></div>
          }
          
          <div className="info">
            <div className="headline">{this.props.post.headline}</div>
            <div className="meta">{moment(this.props.post.created).format('YYYY-MM-DD')}</div>
          </div>
        </Link>
      </div>
    );
  }
});

export default PostItem;
