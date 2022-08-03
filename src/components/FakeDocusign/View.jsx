import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import ViewDocument from './ViewDocument/ViewDocument.jsx';

const View = () => (
  <div>
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 4,
        pb: 1,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          DocuSein
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          View signed document
        </Typography>
      </Container>
    </Box>
    <ViewDocument />
  </div>
);

export default View;
