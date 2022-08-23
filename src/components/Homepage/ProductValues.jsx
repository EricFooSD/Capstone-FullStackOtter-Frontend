import * as React from 'react';

import {
  Box,
  Grid,
  Container,
} from '@mui/material';

import Typography from './Typography.jsx';
import ProductValues1 from './HomeAssets/productValues1.svg';
import ProductValues2 from './HomeAssets/productValues2.svg';
import ProductValues3 from './HomeAssets/productValues3.svg';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'green.xlight' }}
    >
      <Container sx={{
        mt: 7, mb: 7, display: 'flex', position: 'relative',
      }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={ProductValues1}
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                THE BEST TEAM
              </Typography>
              <Typography variant="subtitle1" marked="center" align="center">
                Have an experienced team working on your Web Application, with a few simple steps.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={ProductValues2}
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                AWESOME ROI
              </Typography>
              <Typography variant="subtitle1" marked="center" align="center">
                Get the most value out of every dollar spent.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={ProductValues3}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                EXCLUSIVE RATES
              </Typography>
              <Typography variant="subtitle1" marked="center" align="center">
                By registering, you will have access to rates that you will not find anywhere else.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
