import React from 'react';

export default class Notification extends React.Component {
  static propTypes = {
    story: React.PropTypes.object.isRequired
  }

  render() {
    const {id, country, name} = this.props.story;

    return(
      <div className="notification">
        <p>New story in {country} by {name}</p>
      </div>
    )
  }
}
