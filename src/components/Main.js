import React from 'react';
import * as firebase from 'firebase';

import Map from './Map';
import Links from './Links';
import StoryForm from './StoryForm';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      activeCountry: 'Canada',
      showSection: 'Map'
    }
  }

  componentWillMount() {
    // Initialize Firebase
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
      </div>
    )
  }
}
