import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "I'm thankful for the lived experience of the Brilliant team; scripture based; the breadth of teaching; the amazing people whose hearts are steadfastly fixed on loving the Lord. I could go on.",
    author: "Sarah M.",
    role: "Event Attendee"
  },
  {
    quote: "I love the team who deliver impartation and practical ideas to apply God's thoughts and character to our daily lives to see real transformation.",
    author: "Michael R.",
    role: "Event Attendee"
  },
  {
    quote: "Dutch and I have already received more than any amount of money could ever purchase. Thank you so much.",
    author: "Rachel K.",
    role: "Event Attendee"
  }
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
            Brilliant Event Attendees Say
          </h2>
        </motion.div>

        <div className="relative h-[400px] overflow-hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-8">
                  <svg className="w-12 h-12 text-summit-gray-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-2xl md:text-3xl text-summit-gray-200 mb-8 leading-relaxed">
                  {testimonials[current].quote}
                </p>
                <div>
                  <p className="text-xl font-medium text-white">{testimonials[current].author}</p>
                  <p className="text-lg text-summit-gray-400">{testimonials[current].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-white w-6' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 