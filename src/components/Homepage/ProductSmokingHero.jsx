// =================  IMPORT =========================>
import * as React from 'react';
import { Button, Container } from '@mui/material';
import Typography from './Typography.jsx';
// ===================================================>

function ProductSmokingHero() {
  // .......... RENDERING COMPONENT .......... //
  return (
    <Container
      component="section"
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9,
      }}
    >
      <Button
        sx={{
          border: '4px solid',
          color: 'green.main',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
        href="mailto:fakeemail@gmail.com"
      >
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>

    </Container>
  );
}

export default ProductSmokingHero;
