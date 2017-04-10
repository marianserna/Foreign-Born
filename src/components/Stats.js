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
      labels: ['Canada', 'USA', 'France'],
      datasets: [
        {
          label: '2005',
          data: [18.691, 12.104, 11.294]
        },
        {
          label: '2006',
          data: [18.992, 12.558, 11.392]
        },
        {
          label: '2007',
          data: [19.229, 12.631, 11.505]
        },
        {
          label: '2008',
          data: [19.425, 12.501, 11.560]
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
        <h2 className="input-row">Chart</h2>

        <div className="chart">
          <canvas ref={(canvas) => this.canvas = canvas}></canvas>
        </div>
      </div>
    )
  }
}
