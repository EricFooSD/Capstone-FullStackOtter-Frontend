// =================  IMPORT =========================>
import React, { useContext } from 'react';
import Button from './Button.jsx';
import Typography from './Typography.jsx';
import ProductHeroLayout from './ProductHeroLayout.jsx';
import { UserContext } from '../UserContext.jsx';
// ===================================================>

const backgroundImage = 'https://images.squarespace-cdn.com/content/v1/58f0ecc029687fbef7b86b03/1493045721551-01K5S40PKH6I3XJVA104/93l9RDL.gif';

export default function ProductHero() {
  const { user } = useContext(UserContext);

  // .......... RENDERING COMPONENT .......... //
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9',
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="subtitle2" marked="center" sx={{ fontFamily: 'Oleo Script Swash Caps' }}>
        Relax, and leave your software project troubles with us.
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        We build apps at reasonable rates.
      </Typography>

      {user.length !== 0 ? (
        <Button
          color="green"
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
          color="green"
          variant="contained"
          size="large"
          component="a"
          href="/login"
          sx={{ minWidth: 200 }}
        >
          Get Started
        </Button>
      )}

      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
