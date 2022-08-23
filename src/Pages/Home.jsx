import * as React from 'react';
import ProductCategories from '../components/Homepage/ProductCategories.jsx';
import ProductSmokingHero from '../components/Homepage/ProductSmokingHero.jsx';
import ProductHero from '../components/Homepage/ProductHero.jsx';
import ProductValues from '../components/Homepage/ProductValues.jsx';
import ProductHowItWorks from '../components/Homepage/ProductHowItWorks.jsx';

export default function Home() {
  return (
    <>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductSmokingHero />
    </>
  );
}
