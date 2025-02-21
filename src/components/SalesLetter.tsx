import React from 'react';
import { motion } from 'framer-motion';

const SalesLetter: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="relative bg-summit-black text-summit-white py-16">
      <div className="max-w-[640px] mx-auto px-4 md:px-6 relative z-10">
        {/* Opening Statement */}
        <motion.div 
          {...fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl font-light mb-6 leading-relaxed">
            There's a profound shift happening in how believers experience God...
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-6">
            And it's built on one revolutionary truth:
          </p>
          <p className="text-xl md:text-2xl text-summit-gray-200 italic">
            In Christ, there's nothing standing between you and an extraordinary relationship with God.
          </p>
        </motion.div>

        {/* Key Points */}
        <motion.div 
          {...fadeIn}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 space-y-3"
        >
          <p className="text-lg md:text-xl text-summit-gray-200">Nothing to fix.</p>
          <p className="text-lg md:text-xl text-summit-gray-200">Nothing to overcome.</p>
          <p className="text-lg md:text-xl text-summit-gray-200">Nothing to improve.</p>
        </motion.div>

        {/* Statement */}
        <motion.div 
          {...fadeIn}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-lg mb-3">This isn't spiritual theory.</p>
          <p className="text-xl md:text-2xl font-bold">
            This is the reality Jesus secured for you on the cross.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div 
          {...fadeIn}
          transition={{ delay: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-lg md:text-xl mb-6">
            Yet most believers don't experience this freedom because of one persistent belief:
          </p>
          <p className="text-lg md:text-xl text-summit-gray-200 italic">
            That transformation comes through working harder, praying longer, or having "more faith."
          </p>
        </motion.div>

        {/* Question and Solution */}
        <motion.div 
          {...fadeIn}
          transition={{ delay: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="text-lg mb-3">What if the path to genuine transformation is completely different than what you've been taught?</p>
          <p className="text-lg mb-6">What if the key to experiencing God fully isn't about what you do...</p>
          <p className="text-xl md:text-2xl font-bold">
            But about embracing who you already are in Christ?
          </p>
        </motion.div>

        {/* Event Introduction */}
        <motion.div 
          {...fadeIn}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-lg">
            This revelation is so powerful that Graham and Dionne have created "Living Limitlessly with God" - a breakthrough 2-day experience that's transforming how believers live with God.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SalesLetter; 