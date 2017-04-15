// INITIALIZES MAP SCENE & ADDS LABELS TO MARKERS

import React from 'react';
import MapScene from '../MapScene';

export default class Map extends React.Component {
  static propTypes = {
    setCountry: React.PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      label: {
        visible: false,
        left: 0,
        top: 0,
        text: null
      }
    }
  }

  componentDidMount() {
    this.mapScene = new MapScene(
      this.container,
      this.props.setCountry,
      this.showLabel,
      this.hideLabel
    );
  }

  componentWillUnmount() {
    this.mapScene.stopRendering();
  }

  showLabel = (mouseX, mouseY, country) => {
    this.setState({
      label: {
        visible: true,
        left: mouseX + 5,
        top: mouseY - 45,
        text: country
      }
    });
  }

  hideLabel = () => {
    this.setState({
      label: {
        visible: false
      }
    });
  }

  render() {
    const { label } = this.state;

    return(
      <div className="map-container" style={{cursor: label.visible ? 'pointer' : 'auto'}}>
        <div className="map" ref={(div) => this.container = div}></div>
        {label.visible ?
          <div className="map-label" style={{top: label.top, left: label.left}}>
            {label.text}
          </div>
          : ''
        }
      </div>
    )
  }
}
