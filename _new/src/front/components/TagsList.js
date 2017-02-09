import React from 'react';
import { Link } from 'react-router';
import store from '../redux';

var TagsList = React.createClass({
  componentDidMount() {
    store.dispatch({ type: 'GET_TAGS' });
  },
  render() {
    return (
      <div className="tags" style={{ display: (this.props.tags.length ? 'block' : 'none') }}>
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
