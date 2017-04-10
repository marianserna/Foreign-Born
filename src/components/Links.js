import React from 'react';

export default class Links extends React.Component {
  static propTypes = {
    changeActiveSection: React.PropTypes.func.isRequired
  }

  render() {
    return(
      <div className="links">
        <div className="storyFormLink linkDiv" onClick={() => this.props.changeActiveSection('StoryForm')}>
          <p className="link">YOUR STORY</p>
        </div>
        <div className="storiesLink linkDiv" onClick={() => this.props.changeActiveSection('Stories')}>
          <p className="link">READ STORIES</p>
        </div>
        <div className="chartLink linkDiv" onClick={() => this.props.changeActiveSection('Chart')}>
          <p className="link">STATS</p>
        </div>
      </div>
    )
  }
}
