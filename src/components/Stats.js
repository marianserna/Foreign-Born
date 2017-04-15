// CHART COMPONENT FOR STATS

import React from 'react';
import Highcharts from 'highcharts';
require('highcharts-more')(Highcharts);
import '../HighchartsTheme';

export default class Stats extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    changeActiveSection: React.PropTypes.func.isRequired
  }

  componentDidMount() {

    Highcharts.chart('chart', {
      chart: {
        polar: true,
        type: 'line'
      },
      title: {
        text: 'Foreign Born Population',
        x: -20
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: ['Canada', 'USA', 'France', 'Denmark', 'Germany'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
      },
      series: [
        {
          name: '2005',
          data: [18.691, 12.104, 11.294, 6.466, 12.610],
          pointPlacement: 'on'
        },
        {
          name: '2007',
          data: [19.229, 12.631, 11.505, 6.933, 12.800],
          pointPlacement: 'on'
        },
        {
          name: '2009',
          data: [19.621, 12.535, 11.639, 7.503, 12.920],
          pointPlacement: 'on'
        },
        {
          name: '2013',
          data: [19.993, 13.079, 12.040, 8.478, 12.776],
          pointPlacement: 'on'
        }
      ]
    });
  }

  render() {
    return(
      <div className={`chart-container ${this.props.active ? 'active' : ''}`}>
        <div className="close" onClick={() => {this.props.changeActiveSection('Map')}}>&otimes;</div>
        <div className="chart" id="chart"></div>
      </div>
    )
  }
}
