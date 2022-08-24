// =================  IMPORT =========================>
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import SignDocument from './SignDocument/SignDocument.jsx';
// ===================================================>

const Sign = () => (
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
          Sign current document
        </Typography>
      </Container>
    </Box>
    <SignDocument />
  </div>
);

export default Sign;
