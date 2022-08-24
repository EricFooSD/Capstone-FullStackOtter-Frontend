// =================  IMPORT =========================>
import React, { useContext } from 'react';
import { Box, Grid, Container } from '@mui/material';
import Button from './Button.jsx';
import Typography from './Typography.jsx';
import ProductHowItWorks1 from './HomeAssets/productHowItWorks1.svg';
import ProductHowItWorks2 from './HomeAssets/productHowItWorks2.svg';
import ProductHowItWorks3 from './HomeAssets/productHowItWorks3.svg';
import { UserContext } from '../UserContext.jsx';
// ===================================================>

// ........ STYLING ........ //
const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'green.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  const { user } = useContext(UserContext);

  // .......... RENDERING COMPONENT .......... //
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'green.xlight', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 7,
          mb: 7,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 5 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5} sx={{ mb: 5 }}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={ProductHowItWorks1}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="subtitle1" align="center">
                  Post the specifications of the application you want to be created!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={ProductHowItWorks2}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="subtitle1" align="center">
                  Project Managers are assigned various qualified
                  software engineers to develop your project!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={ProductHowItWorks3}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="subtitle1" align="center">
                  Be updated of the live progress of your project,
                  through our Kanban Board!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        {user.length !== 0 ? (
          <Button
            color="greenLight"
            variant="contained"
            size="large"
            component="a"
            href="/dashboard"
            sx={{ minWidth: 200 }}
          >
            Get Started
          </Button>
        ) : (
          <Button
            color="greenLight"
            variant="contained"
            size="large"
            component="a"
            href="/login"
            sx={{ minWidth: 200 }}
          >
            Get Started
          </Button>
        )}
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
