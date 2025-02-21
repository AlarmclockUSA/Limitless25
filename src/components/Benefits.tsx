import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ModalContext } from '../App';

interface DayContent {
  day: string;
  title: string;
  topics: string[];
}

const days: DayContent[] = [
  {
    day: "Day One",
    title: "Your True Identity",
    topics: [
      "The stunning truth about how God sees you in Christ",
      "Why your new nature is better than you've imagined",
      "How to permanently step out of performance-based living"
    ]
  },
  {
    day: "Day Two",
    title: "Your Limitless Life",
    topics: [
      "The secret to experiencing God without pressure",
      'Why "slow learning" creates lasting transformation',
      "How to enjoy intimate relationship with God naturally"
    ]
  }
];

const Benefits: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <section className="relative bg-white text-summit-black py-16">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Here's what you'll discover
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
          {days.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: dayIndex * 0.2 }}
              className="relative"
            >
              <div className="p-6">
                <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium mb-3">
                  {day.day}
                </div>
                <div className="text-summit-black/70 text-base mb-3">
                  {dayIndex === 0 ? "March 7th" : "March 8th"} • 10:00 AM - 11:30 AM PST
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  {day.title}
                </h3>
                <div className="space-y-3">
                  {day.topics.map((topic, topicIndex) => (
                    <motion.div
                      key={topicIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: dayIndex * 0.2 + topicIndex * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-gray-50 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-base text-summit-black/80 leading-relaxed">
                        {topic}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-lg text-summit-black/80 mb-6">
            This isn't another "try harder" program.<br />
            This is your invitation to experience the freedom that's already yours.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col items-center gap-2 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg md:text-xl font-medium hover:from-[#FF8787] hover:to-[#FFC347] transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20"
            >
              Reserve Your FREE Spot Now
            </motion.button>

            <div className="inline-flex items-center justify-center gap-2 bg-gray-100 rounded-full px-3 py-1">
              <span className="text-summit-black/80 text-sm">💫 Interactive Online Experience</span>
            </div>

            <p className="text-sm md:text-base text-summit-black/80 font-medium">
              March 7th & 8th • 10:00 AM - 11:30 AM PST
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits; 