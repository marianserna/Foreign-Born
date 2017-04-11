import React from 'react';
import { Chart } from 'chart.js';

export default class Stats extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    changeActiveSection: React.PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.data = {
      labels: ['Canada', 'USA', 'France', 'Denmark', 'Germany'],
      datasets: [
        {
          label: '2005',
          data: [18.691, 12.104, 11.294, 6.466, 12.610],
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
        {
          label: '2007',
          data: [19.229, 12.631, 11.505, 6.933, 12.800],
          backgroundColor: 'rgba(255, 90, 9, 0.4)',
        },
        {
          label: '2009',
          data: [19.621, 12.535, 11.639, 7.503, 12.920],
          backgroundColor: 'rgba(122, 207, 214, 0.4)',
        },
        {
          label: '2013',
          data: [19.993, 13.079, 12.040, 8.478, 12.776],
          backgroundColor: 'rgba(116,82,133, 0.4)',
        },
      ]
    }
  }

  componentDidMount() {
    new Chart(this.canvas, {
      type: 'radar',
      data: this.data,
      options: {
        responsive: true
      }
    });
  }

  render() {
    return(
      <div className={`chart-container ${this.props.active ? 'active' : ''}`}>
        <div className="close" onClick={() => {this.props.changeActiveSection('Map')}}>&otimes;</div>
        <div className="chart">
          <canvas ref={(canvas) => this.canvas = canvas}></canvas>
        </div>
      </div>
    )
  }
}
