import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import PrepareDocument from './PrepareDocument/PrepareDocument.jsx';

const Preparation = () => (
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
          Select your document for signing from your local computer
        </Typography>
      </Container>
    </Box>
    <PrepareDocument />
  </div>
);

export default Preparation;
