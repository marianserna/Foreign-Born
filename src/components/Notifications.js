import React from 'react';
import Notification from './Notification';

export default class Notifications extends React.Component {
  static propTypes = {
    stories: React.PropTypes.array.isRequired
  }

  render() {
    return(
      <div className="notifications">
        {this.props.stories.map((story) => {
          return(
            <Notification key={story.id} story={story} />
          )
        })}
      </div>
    )
  }
}
