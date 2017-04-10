import React from 'react';
import { Link } from 'react-router-dom';

export default class Intro extends React.Component {

  render() {
    return(
      <div className="intro">
        <h1>FOREIGN BORN</h1>
        <Link to="/map">
          <h2>ENTER</h2>
        </Link>
      </div>
    )
  }
}
