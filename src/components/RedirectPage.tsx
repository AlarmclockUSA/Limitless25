import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const RedirectPage: React.FC = () => {
  useEffect(() => {
    // Set a short timeout to allow the message to be seen briefly
    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://brilliance25.com/?el=limitlessredirect';
    }, 3000); // 3 seconds

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <img 
          src="/Brilliant_Full-Color_White.png" 
          alt="Brilliant"
          className="h-16 mx-auto mb-8"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Limitless is over
        </h1>
        
        <p className="text-xl text-white/80 mb-4">
          Join us for our next event Brilliance25
        </p>
        
        <p className="text-lg text-white/60 mb-8">
          Redirecting you to our new event page...
        </p>

        <div className="w-16 h-16 mx-auto">
          <svg className="animate-spin text-white/70 w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default RedirectPage; 