import React from 'react';
import MapScene from '../MapScene';

export default class Map extends React.Component {
  static propTypes = {
    setCountry: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    new MapScene(this.container, this.props.setCountry);
  }

  render() {
    return(
      <div className="map" ref={(div) => this.container = div}></div>
    )
  }
}
