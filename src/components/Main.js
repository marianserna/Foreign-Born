import React from 'react';
import * as firebase from 'firebase';

import Map from './Map';
import Links from './Links';
import StoryForm from './StoryForm';
import Notifications from './Notifications';
import Stories from './Stories';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      activeCountry: 'Canada',
      showSection: 'Map',
      notifications: [],
      stories: []
    }
  }

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCHJxW6iYfJx-gvcHaKq5K0yxw7D-nRkXE",
      authDomain: "foreign-born.firebaseapp.com",
      databaseURL: "https://foreign-born.firebaseio.com",
      projectId: "foreign-born",
      storageBucket: "foreign-born.appspot.com",
      messagingSenderId: "536828661131"
    };
    firebase.initializeApp(config);

    this.database = firebase.database();
    this.listenForRecent();
    this.loadStories(this.state.activeCountry);
  }

  listenForRecent = () => {
    this.database.ref().child('stories').limitToLast(1).on('child_added', (snapshot) => {
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

  removeNotification = (id) => {
    // Selects all notifications that aren't the one I'm trying to remove
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

  addStory = (story) => {
    //post story to FB
    this.database.ref().child('stories').push(story);
  }

  loadStories = (country) => {
    this.database.ref().child('stories').orderByChild('country').equalTo(country).limitToLast(15).once('value', (snapshot) => {
      const stories = [];

      snapshot.forEach((child) => {
        const story = child.val();
        story.id = child.key;
        stories.push(story);
      });

      this.setState({
        stories: stories
      });
    })
  }

  render() {
    return(
      <div>
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
      </div>
    )
  }
}
