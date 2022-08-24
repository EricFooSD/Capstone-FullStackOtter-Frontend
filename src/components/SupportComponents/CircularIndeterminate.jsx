// =================  IMPORT =========================>
import * as React from 'react';
import { CircularProgress, Box } from '@mui/material';
// ===================================================>

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}
