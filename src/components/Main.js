// RENDERS ALL COMPONENTS

import React from 'react';
import database from '../database';

import Map from './Map';
import Links from './Links';
import StoryForm from './StoryForm';
import Notifications from './Notifications';
import Stories from './Stories';
import Stats from './Stats';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      activeCountry: 'Canada',
      showSection: 'Map',
      notifications: [],
      stories: []
    }
    this.countryStoriesRef = database.ref();
  }

  componentDidMount() {
    this.listenForRecent();
    this.loadStories(this.state.activeCountry);
  }

  // Real time component: Listens for latest added story and displays it for 5 secs.
  listenForRecent = () => {
    database.ref().child('stories').limitToLast(1).on('child_added', (snapshot) => {
      const story = snapshot.val();
      story.id = snapshot.key;

      this.setState({
        notifications: [...this.state.notifications, story]
      });

      setTimeout(() => {
        this.removeNotification(story.id);
      }, 5000)
    })
  }

  // Selects all notifications that aren't the one I'm trying to remove
  removeNotification = (id) => {
    const newNotifications = this.state.notifications.filter((notification) => {
      return notification.id !== id;
    });

    this.setState({
      notifications: newNotifications
    })
  }

  setCountry = (country) => {
    this.setState({
      activeCountry: country
    });
    this.loadStories(country);
  }

  changeActiveSection = (section) => {
    this.setState({
      showSection: section
    });
  }

  //post story to FBase
  addStory = (story) => {
    database.ref().child('stories').push(story);
  }

  // Load stories that go in the story list based on the country
  loadStories = (country) => {
    this.countryStoriesRef.off();
    this.countryStoriesRef.child('stories').
      orderByChild('country').equalTo(country).limitToLast(15).
      on('value', (snapshot) => {
      const stories = [];

      snapshot.forEach((child) => {
        const story = child.val();
        story.id = child.key;
        stories.push(story);
      });

      this.setState({
        stories: stories.reverse()
      });
    })
  }

  render() {
    return(
      <div className="main">
        <Links changeActiveSection={this.changeActiveSection} />
        <Map setCountry={this.setCountry}/>
        <StoryForm
          active={this.state.showSection === 'StoryForm'}
          changeActiveSection={this.changeActiveSection}
          country={this.state.activeCountry}
          addStory={this.addStory}
        />
        <Notifications stories={this.state.notifications}/>
        <Stories
          stories={this.state.stories}
          country={this.state.activeCountry}
          active={this.state.showSection === 'Stories'}
          changeActiveSection={this.changeActiveSection}
        />
      <Stats
        active={this.state.showSection === 'Stats'}
        changeActiveSection={this.changeActiveSection}
      />
      </div>
    )
  }
}
