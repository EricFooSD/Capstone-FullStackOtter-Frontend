import * as React from 'react';
import ProductCategories from '../components/Home/ProductCategories.jsx';
import ProductSmokingHero from '../components/Home/ProductSmokingHero.jsx';
import ProductHero from '../components/Home/ProductHero.jsx';
import ProductValues from '../components/Home/ProductValues.jsx';
import ProductHowItWorks from '../components/Home/ProductHowItWorks.jsx';

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
