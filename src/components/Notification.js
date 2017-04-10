import React from 'react';
import { Link } from 'react-router-dom';

export default class Notification extends React.Component {
  static propTypes = {
    story: React.PropTypes.object.isRequired
  }

  render() {
    const {id, country, name} = this.props.story;

    return(
      <Link to={`/stories/${id}`}>
        <div className="notification">
          <p>New story in {country} by {name}</p>
        </div>
      </Link>
    )
  }
}
