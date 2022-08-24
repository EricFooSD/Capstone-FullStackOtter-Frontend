/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
// @mui
// =================  IMPORT =========================>
import React from 'react';
import PropTypes from 'prop-types';
import {
  alpha, styled, Card, Typography,
} from '@mui/material';
import Iconify from '../SupportComponents/Iconify.jsx';
// ===================================================>

// .... Styling .... //
const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// .... Set Prop Types .... //
DashboardWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function DashboardWidgetSummary({
  title, total, icon, color = 'primary', sx, ...other
}) {
  // .......... RENDERING COMPONENT .......... //
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) => `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
            theme.palette[color].dark,
            0.24,
          )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={30} height={30} />
      </IconWrapperStyle>

      <Typography variant="h4">{total}</Typography>

      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
