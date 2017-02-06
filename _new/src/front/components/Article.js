import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

var Article = React.createClass({
  render() {
    return (
      <div>
        <Link to="/">&lt; Back Home</Link>
        <div className="meta">
          <div className="author">Author: {this.props.post.author}</div>
          <div className="date">Published: {moment(this.props.post.created).format('YYYY-MM-DD HH:mm')}</div>
        </div>
        <h1>{this.props.post.headline}</h1>
          {this.props.post.image &&
            <div>
              <img src={this.props.post.image} alt={this.props.post.headline} />
              <br />
              <br />
            </div>
          }

        {this.props.post.source &&
          <div>
            <a href={this.props.post.source}>Open source link</a>
            <br />
            <br />
          </div>
        }
        {this.props.post.body}
      </div>
    );
  }
});

export default Article;
