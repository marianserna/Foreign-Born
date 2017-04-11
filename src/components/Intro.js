import React from 'react';
import { TweenMax, TimelineLite } from 'gsap';

export default class Intro extends React.Component {

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

  transitionTo = (e) => {
    e.preventDefault();

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
        <h3>Each person is fighting its own battle. Be kind.</h3>
        <a href="#" onClick={(e) => {this.transitionTo(e)}}>
          <button className="intro-button">ENTER</button>
        </a>
      </div>
    )
  }
}
