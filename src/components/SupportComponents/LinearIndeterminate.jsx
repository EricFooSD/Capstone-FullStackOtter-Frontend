import * as React from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%', my: 5 }}>
      <LinearProgress color="success" />
    </Box>
  );
}
