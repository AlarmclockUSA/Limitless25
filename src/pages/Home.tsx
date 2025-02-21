import React from 'react';
import Hero from '../components/Hero';
import SalesLetter from '../components/SalesLetter';
import Benefits from '../components/Benefits';
import Speakers from '../components/Speakers';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import BeforeAfter from '../components/BeforeAfter';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <SalesLetter />
      <Speakers />
      <Benefits />
      <Testimonials />
      <BeforeAfter />
      <Experience />
    </>
  );
};

export default Home; 