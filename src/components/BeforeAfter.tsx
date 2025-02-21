import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ModalContext } from '../App';

const BeforeAfter: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <section className="bg-summit-black text-summit-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Transformation Journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Before Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-summit-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="absolute -top-4 left-8 bg-summit-black px-4 py-1 rounded-full border border-white/10">
              <span className="text-summit-gray-400 text-sm font-medium">BEFORE THE EVENT</span>
            </div>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✕</span>
                <p className="text-summit-gray-200">Feeling stuck in your relationship with God</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✕</span>
                <p className="text-summit-gray-200">Struggling with performance-based Christianity</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✕</span>
                <p className="text-summit-gray-200">Unsure how to experience God's presence daily</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✕</span>
                <p className="text-summit-gray-200">Living below your true potential in Christ</p>
              </li>
            </ul>
          </motion.div>

          {/* After Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-summit-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="absolute -top-4 left-8 bg-summit-black px-4 py-1 rounded-full border border-white/10">
              <span className="text-summit-gray-400 text-sm font-medium">AFTER THE EVENT</span>
            </div>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <p className="text-summit-gray-200">Living in the freedom of your true identity</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <p className="text-summit-gray-200">Experiencing God's presence naturally and easily</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <p className="text-summit-gray-200">Walking in confidence and spiritual authority</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <p className="text-summit-gray-200">Embracing a limitless life with God</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-10 py-5 rounded-full text-xl md:text-2xl font-medium hover:from-[#FF8787] hover:to-[#FFC347] transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20"
          >
            Reserve Your FREE Spot Now
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-2 mt-4"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1">
              <span className="text-white text-sm">💫 Interactive Online Experience</span>
            </div>

            <p className="text-base md:text-lg text-summit-gray-200 font-medium">
              March 7th & 8th • 10:00 AM - 11:30 AM PST
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter; 