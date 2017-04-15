// SINGLE STORY

import React from 'react';
import { Link } from 'react-router-dom';

export default class Story extends React.Component {
  static propTypes = {
    story: React.PropTypes.object.isRequired
  }

  render() {
    const {id, country, name, message} = this.props.story;

    return(
      <Link to={`/stories/${id}`}>
        <div className="story">
          <p className="story-intro">Read <span>{name}&apos;s</span> Story</p>
          <p>{message.substring(0, 50)}...</p>
        </div>
      </Link>
    )
  }
}
