/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
// =================  IMPORT =========================>
import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@mui/material';
import { BaseOptionChart } from './BaseOptionChart.jsx';
// ===================================================>

// .... Set Prop Types .... //
DashboardBarChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function DashboardBarChart({
  title, subheader, chartData, ...other
}) {
  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => (seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  // .......... RENDERING COMPONENT .......... //
  return (
    <Card {...other}>
      <CardHeader sx={{ my: 1, py: 0, mb: 0 }} title={title} subheader={subheader} />
      <Box sx={{ mr: 2, pt: 0 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={200} />
      </Box>
    </Card>
  );
}
