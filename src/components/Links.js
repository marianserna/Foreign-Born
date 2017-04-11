import React from 'react';

export default class Links extends React.Component {
  static propTypes = {
    changeActiveSection: React.PropTypes.func.isRequired
  }

  render() {
    return(
      <div className="links">
        <div className="storyFormLink linkDiv" onClick={() => this.props.changeActiveSection('StoryForm')}>
          <p className="link right">YOUR STORY</p>
        </div>
        <div className="storiesLink linkDiv" onClick={() => this.props.changeActiveSection('Stories')}>
          <p className="link left">READ STORIES</p>
        </div>
        <div className="chartLink linkDiv" onClick={() => this.props.changeActiveSection('Stats')}>
          <p className="link left">STATS</p>
        </div>
      </div>
    )
  }
}
