import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import Assign from './Assign/Assign.jsx';

const AssignUsers = () => (
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
          Assign users to sign your document
        </Typography>
      </Container>
    </Box>
    <Assign />
  </div>
);

export default AssignUsers;
