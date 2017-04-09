import React from 'react';
import Map from './Map';
import Links from './Links';

export default class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      activeCountry: 'Canada',
      showSection: 'map'
    }
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

  loadStories = (country) => {

  }

  render() {
    return(
      <div>
        <Links changeActiveSection={this.changeActiveSection} />
        <Map setCountry={this.setCountry}/>
      </div>
    )
  }
}
