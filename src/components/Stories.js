// CONTAINS A SERIES OF INDIVIDUAL STORIES

import React from 'react';
import Story from './Story';

export default class Stories extends React.Component {
  static propTypes = {
    stories: React.PropTypes.array.isRequired,
    country: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    changeActiveSection: React.PropTypes.func.isRequired
  }

  render() {
    return(
      <div className={`stories-container ${this.props.active ? 'active' : ''}`}>
        <div className="close" onClick={() => {this.props.changeActiveSection('Map')}}>&otimes;</div>
        <h2 className="input-row">Stories from <span>{this.props.country}</span></h2>

        <div className="stories-stack">
          {
            this.props.stories.map((story) => {
              return(
                <Story key={story.id} story={story} />
              )
            })
          }
        </div>
      </div>
    )
  }
}
