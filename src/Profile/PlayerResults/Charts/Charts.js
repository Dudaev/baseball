import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Select from 'react-select';
import queryBattingGraph from '../../requests/queryBattingGraph';

const Charts = ({ personId }) => {
  const [chart, setChart] = useState('');
  useEffect(() => {
    queryBattingGraph(localStorage.accessToken, localStorage.client, personId, '')
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setChart(response.data.data.batting_graph.graph_rows);
      });
  }, []);
  if (chart === '') {
    return <p>Loading Charts…</p>;
  }
  if (!chart.length) {
    return <p>There&apos;s no info yet!</p>;
  }
  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Rolling Exit Velocity for Corey Whiting',
    },

    subtitle: {
      text: 'Average over last 11 batted balls',
    },

    yAxis: {
      title: {
        text: 'Exit Velocity',
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 1,
      },
    },

    series: [
      {
        name: 'Exit Velocity',
        data: chart,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };

  const handleChange = event => {
    queryBattingGraph(localStorage.accessToken, localStorage.client, personId, event.value)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setChart(response.data.data.batting_graph.graph_rows);
      });
  };

  return (
    <>
      <Select
        options={[
          { value: '', label: 'None' },
          { value: 'Four Seam Fastball', label: 'Four Seam Fastball' },
          { value: 'Two Seam Fastball', label: 'Two Seam Fastball' },
          { value: 'Curveball', label: 'Curveball' },
          { value: 'Changeup', label: 'Changeup' },
          { value: 'Slider', label: 'Slider' },
        ]}
        onChange={handleChange}
      />
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

Charts.propTypes = {
  personId: PropTypes.number,
};

export default Charts;
