import React from 'react';
import { motion } from 'motion/react';
import DecorativeElements from './DecorativeElements';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto relative">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          className="lg:col-span-7 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm text-gray-600">
            <span>hello@voyage.travel</span>
            <span>•</span>
            <span>(+39) 02 1234 5678</span>
          </div>

          {/* Main Heading - Editorial Style */}
          <div className="mb-6 sm:mb-8">
            <h1 className="display-xl mb-2">
              where <DecorativeElements type="asterisk" />
            </h1>
            <h1 className="display-xl mb-2">
              <span className="text-orange">- a travel</span>
            </h1>
            <h1 className="display-xl">
              moment
            </h1>
          </div>

          {/* Scroll Down Badge */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-8 sm:mb-12">
            <DecorativeElements type="badge" text="SCROLL DOWN" variant="outline" />
            <DecorativeElements type="asterisk" />
            <span className="label-sm text-gray-500">[2024]</span>
          </div>

          {/* Description */}
          <p className="body-lg text-gray-600 max-w-lg mb-6 sm:mb-8">
            Explore the world with blockchain-powered travel experiences. From tropical paradises to urban adventures, discover destinations that redefine modern exploration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
            <a href="#destinations" className="btn-primary">
              Explore Destinations
            </a>
            <a href="#how-it-works" className="btn-secondary">
              Learn More
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-8 sm:mb-0">
            <div>
              <p className="text-2xl sm:text-3xl font-bold">320K</p>
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Travelers</p>
            </div>
            <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold">400+</p>
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Destinations</p>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 opacity-60">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Powered by:</span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-medium text-xs sm:text-sm">Ethereum</span>
              <span className="font-medium text-xs sm:text-sm">IPFS</span>
              <span className="font-medium text-xs sm:text-sm">Web3Modal</span>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:col-span-5 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-full">
            <img
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop"
              alt="Travel Destination"
              className="rounded-3xl w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover shadow-lg"
            />

            {/* Decorative Badge on Image */}
            <div className="absolute top-4 right-4">
              <DecorativeElements type="badge" text="FEATURED" variant="orange" />
            </div>

            {/* Floating Card - Hidden on mobile, positioned safely on desktop */}
            <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 hidden lg:block max-w-[200px]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate">Secure Payment</p>
                  <p className="font-medium text-xs sm:text-sm truncate">Ethereum</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;