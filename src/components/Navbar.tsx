import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : 0,
      }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed top-20 left-0 right-0 z-40 bg-summit-black/95 backdrop-blur-sm border-b border-white/10 overflow-hidden"
    >
      <div className="px-4 py-6 space-y-4">
        {['About', 'Programs', 'Events', 'Coaching', 'Explore', 'Shop'].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase()}`}
            className="block text-summit-white hover:text-summit-gray-300 text-sm font-medium transition-colors duration-200"
          >
            {item}
          </a>
        ))}
        <div className="pt-4 space-y-4">
          <a href="/login" className="block text-summit-white hover:text-summit-gray-300 text-sm font-medium transition-colors duration-200">
            Log in
          </a>
          <a href="/start" className="block w-full text-center bg-summit-white text-summit-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-summit-gray-200 transition-colors duration-200">
            Start now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-summit-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <a href="/" className="text-summit-white text-2xl font-bold tracking-tight">
                LIMITLESS SUMMIT
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Programs', 'Events', 'Coaching', 'Explore', 'Shop'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-summit-white hover:text-summit-gray-300 text-sm font-medium transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-summit-white hover:text-summit-gray-300 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </motion.button>
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                href="/login"
                className="text-summit-white hover:text-summit-gray-300 text-sm font-medium transition-colors duration-200"
              >
                Log in
              </motion.a>
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                href="/start"
                className="bg-summit-white text-summit-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-summit-gray-200 transition-colors duration-200"
              >
                Start now
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-summit-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu isOpen={isOpen} />
    </>
  );
};

export default Navbar; 