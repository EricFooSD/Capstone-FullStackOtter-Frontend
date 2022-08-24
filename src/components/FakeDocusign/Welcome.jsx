// =================  IMPORT =========================>
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Button, Heading,
} from 'gestalt';

import { Box, Container, Typography } from '@mui/material';
import SignList from './Lists/SignList.jsx';
import SignedList from './Lists/SignedList.jsx';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice.js';
import { resetDocToSign } from './SignDocument/SignDocumentSlice.js';
import { UserContext } from '../UserContext.jsx';
// ===================================================>

function Welcome() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  // .......... RENDERING COMPONENT .......... //
  return (
    <>
      <Container>
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
              Manage contracts and signatures via
              {' '}
              {user.email}
            </Typography>
          </Container>
        </Box>
        <Box padding={3}>
          <Heading size="md">Sign Documents</Heading>
        </Box>
        <Box padding={3}>
          <SignList />
        </Box>
        <Box padding={3}>
          <Heading size="md">Prepare Document</Heading>
        </Box>
        <Box padding={2}>
          <Button
            onClick={() => {
              navigate('/assignUsers');
            }}
            text="Prepare Document for Signing"
            color="blue"
            inline
          />
        </Box>
        <Box padding={3}>
          <Heading size="md">Review Signed Documents</Heading>
        </Box>
        <Box padding={3}>
          <SignedList />
        </Box>
      </Container>
    </>
  );
}
export default Welcome;
