import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="relative min-h-[80vh] bg-summit-black text-summit-white pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/header-bg.jpg")',
          backgroundPosition: 'center 20%'
        }}
      ></div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-6 pt-20 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            Explore Limitless<br />Summit events
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-12 max-w-2xl text-summit-gray-200 leading-relaxed"
          >
            Create your own success story through the massive impact of a Limitless Summit event. 
            Call <a href="tel:858-290-4113" className="text-summit-white underline hover:text-summit-gray-300 transition-colors duration-200">858-290-4113</a> now to learn more about our events.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-summit-white text-summit-black px-8 py-4 rounded-full text-lg font-medium hover:bg-summit-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View the calendar
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-summit-black to-transparent"></div>
    </header>
  );
};

export default Header; 