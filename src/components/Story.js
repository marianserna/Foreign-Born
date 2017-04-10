import React from 'react';

export default class Story extends React.Component {
  static propTypes = {
    story: React.PropTypes.object.isRequired
  }

  render() {
    const {id, country, name, message} = this.props.story;

    return(
      <div className="story">
        <p className="intro">Read <span>{name}&apos;s</span> Story</p>
        <p>{message.substring(0, 50)}...</p>
      </div>
    )
  }
}
