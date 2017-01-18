import React from 'react';
import { Link } from 'react-router';

var TagsList = React.createClass({
  render() {
    return (
      <div className="tags">
        <h3>Tags</h3>
        <ul>
          {this.props.tags.map((tag)=>{
            return <li key={tag._id}><Link to={`/tag/${tag._id}`} activeClassName="selected">{tag._id}</Link></li>
          })}
        </ul>
      </div>
    );
  }
});

export default TagsList;
