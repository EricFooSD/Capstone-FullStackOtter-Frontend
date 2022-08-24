/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
// =================  IMPORT =========================>
import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import {
  useTheme, styled, Card, CardHeader,
} from '@mui/material';
import { BaseOptionChart } from './BaseOptionChart.jsx';
// ===================================================>

// .... Chart Styling .... //
const CHART_HEIGHT = 207;
const LEGEND_HEIGHT = 40;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// .... Set Prop Types .... //
DashboardPieChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function DashboardPieChart({
  title, subheader, chartColors, chartData, ...other
}) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);
  const chartOptions = merge(BaseOptionChart(), {
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => (seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  // .......... COMPONENT .......... //
  return (
    <Card {...other}>
      <CardHeader sx={{ my: 1, py: 0 }} title={title} subheader={subheader} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={180} />
      </ChartWrapperStyle>
    </Card>
  );
}
