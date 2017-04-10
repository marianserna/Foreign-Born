import React from 'react';
import { Link } from 'react-router-dom';

export default class Intro extends React.Component {

  render() {
    return(
      <div className="intro">
        <h1>FOREIGN BORN</h1>
        <h3>Celebrate Diversity</h3>
        <Link to="/map">
          <button className="intro-button">ENTER</button>
        </Link>
      </div>
    )
  }
}
