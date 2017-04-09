import React from 'react';
import Map from './Map';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      activeCountry: null
    }
  }

  setCountry = (country) => {
    this.setState({
      activeCountry: country
    });
    this.loadStories(country);
  }

  loadStories = (country) => {

  }

  render() {
    return(
      <Map setCountry={this.setCountry}/>
    )
  }
}
