import React from 'react';
import { TweenMax, TimelineLite } from 'gsap';
import { firebase } from '../database';

export default class Intro extends React.Component {
  constructor() {
    super();

    // Facebook auth from firebase documentation: https://firebase.google.com/docs/auth/web/facebook-login
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.handleSignin();
  }

  handleSignin = () => {
  // Adds an observer for auth state changes.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        sessionStorage.setItem('userName', user.displayName);
        this.transitionTo();
      }
    });
  }

  componentDidMount() {
    const timeline = new TimelineLite();

    timeline.staggerFromTo(
      'h1, h3, a',
      3,
      {opacity: 0, y: 50},
      {opacity: 1, y: 0, ease: TweenMax.Elastic.easeOut, delay: 0.5},
      0.5
    );
  }

  signIn = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(this.provider);
  }

  transitionTo = () => {
    const timeline = new TimelineLite({onComplete: this.removeIntro});

    timeline.staggerFromTo(
      'h1, h3, a',
      1,
      {opacity: 1, y: 0},
      {opacity: 0, y: -300, ease: TweenMax.Power4.easeOut},
      0.3
    );
  }

  removeIntro = () => {
    TweenMax.fromTo(
      '.intro',
      0.5,
      {opacity: 1},
      {opacity: 0, onComplete: this.redirect}
    );
  }

  redirect = () => {
    this.props.history.push('/map');
  }

  render() {
    return(
      <div className="intro">
        <h1>FOREIGN BORN</h1>
        <h3>Be kind. Each person is fighting its own battle.</h3>
        <a href="#" onClick={(e) => {this.signIn(e)}}>
          <button className="intro-button">ENTER</button>
        </a>
      </div>
    )
  }
}
