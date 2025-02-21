import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ModalContext } from '../App';

const Hero: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <header className="relative min-h-[70vh] bg-summit-black text-summit-white pt-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/header-bg.jpg")',
          backgroundPosition: 'center 20%'
        }}
      ></div>

      {/* Logo */}
      <div className="relative z-20 px-4 md:px-6 lg:px-8">
        <img 
          src="/Brilliant_Full-Color_White.png" 
          alt="Brilliant"
          className="h-10 md:h-12"
        />
      </div>

      <div className="relative z-20 w-full mx-auto px-4 md:px-6 lg:px-8 pt-10 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-white uppercase tracking-wider text-base md:text-lg font-medium">
                Free 2-Day Virtual Event
              </span>
            </div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] tracking-tight mx-auto"
          >
            Your Limitless Life<br />With God
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-summit-gray-200 mb-6 font-medium"
          >
            March 7th & 8th • 10:00 AM - 11:30 AM PST
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl xl:text-2xl mb-10 max-w-2xl text-summit-gray-200 leading-relaxed mx-auto"
          >
            Join Graham Cooke, Dionne van Zyl, and special guests for a transformative online experience that will forever change how you live with God — from anywhere in the world.
          </motion.p>

          <div className="flex flex-col items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg md:text-xl font-medium hover:from-[#FF8787] hover:to-[#FFC347] transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20"
            >
              Reserve Your FREE Spot Now
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1"
            >
              <span className="text-white text-sm">💫 Interactive Online Experience</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm md:text-base text-summit-gray-200 font-medium"
            >
              Limited virtual seats available • Join from the comfort of your home
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Speaker Avatars */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-4 md:px-6 lg:px-8 mb-10 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="flex -space-x-3">
            <div className="w-12 h-12 rounded-full border-2 border-summit-white overflow-hidden">
              <img 
                src="/images/speakers/grahamcooke.jpg" 
                alt="Graham Cooke"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-summit-white overflow-hidden">
              <img 
                src="/images/speakers/dionne.jpg" 
                alt="Dionne van Zyl"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-summit-gray-300 text-sm">+ Special Guests</span>
        </motion.div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-summit-black via-summit-black/50 to-transparent"></div>
    </header>
  );
};

export default Hero; 