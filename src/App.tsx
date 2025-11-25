import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import { ProviderProvider } from './components/ProviderContext';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App overflow-x-hidden w-full">
      <ProviderProvider>
        <Navbar />
        <Hero />
        <ProductGallery />
        <HowItWorks />
        <About />
        <Footer />
      </ProviderProvider>
    </div>
  );
}

export default App;