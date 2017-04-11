import React from 'react';
import database from '../database';
import { Link } from 'react-router-dom';

export default class StoryDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      story: null
    }
  }

  componentDidMount() {
    database.ref(`/stories/${this.props.match.params.storyId}`).once('value', (snapshot) => {
      this.setState({
        story: snapshot.val(),
        loading: false
      })
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          Loading...
        </div>
      )
    }

    const {story} = this.state;

    return(
      <div className="story-details">
        <Link to='/map'>
          <div className="close">&otimes;</div>
        </Link>
        <div className="story-details-text">
          <h2>{story.name} in <span>{story.country}</span></h2>
          <p className="story-message">{story.message}</p>
        </div>
      </div>
    )
  }
}
