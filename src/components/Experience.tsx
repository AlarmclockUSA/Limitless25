import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ModalContext } from '../App';

const faqs = [
  {
    question: "What can I expect from this event?",
    answer: "Two transformative days of teaching, interactive sessions, and practical application. You'll learn how to experience God's presence naturally and live from your true identity in Christ."
  },
  {
    question: "Is this just another online event?",
    answer: "Not at all! You'll get a front row seat in this immersive and interactive experience. Forget about passive webinars - LIMITLESS uses cutting-edge technology to create a truly engaging environment. You'll connect with like-minded believers, experience transformational teaching, and participate in dynamic interactions with Graham and Dionne live from our professional broadcast studio. This is an intimate, interactive experience designed to help you encounter God in a fresh way."
  },
  {
    question: "How do I access the event?",
    answer: "Once registered, you'll receive a link to our simple online portal where you'll find everything you need. The portal gives you access to both main sessions, interactive elements, and any additional resources shared during the event. We've made the technical side seamless so you can focus entirely on your experience with God."
  },
  {
    question: "What are the event times?",
    answer: "The event runs March 7th & 8th, from 10:00 AM to 11:30 AM PST each day. We recommend joining a few minutes early to get settled."
  },
  {
    question: "Will there be recordings available?",
    answer: "Yes! While we encourage live participation for the best interactive experience, you can access all session recordings with our All Access Pass option, available during the sign-up process."
  }
];

const Experience: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <section className="bg-summit-black text-summit-white">
      {/* Final CTA Section - Full Width */}
      <div className="relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/header-bg.jpg")',
            backgroundPosition: 'center 20%'
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <span className="text-white uppercase tracking-wider text-base md:text-lg font-medium">
                🌐 Free Virtual Event
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience God Without Limits?
            </h2>
            <p className="text-xl md:text-2xl text-summit-gray-200 mb-8">
              Join us online for two transformative days that will forever change how you experience God — from anywhere in the world.
            </p>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="inline-flex items-center justify-center gap-2 bg-white/10 rounded-full px-4 py-1 mb-6">
                <span className="text-white text-sm">✨ Interactive Online Experience</span>
              </div>
              <p className="text-2xl md:text-3xl font-medium mb-4">
                March 7th & 8th • 10:00 AM - 11:30 AM PST
              </p>
              <p className="text-lg md:text-xl text-summit-gray-200 mb-8">
                Limited virtual seats available. Experience this transformative event from the comfort of your home.
              </p>
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
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center gap-2 mt-4"
              >
                <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1">
                  <span className="text-white text-sm">💫 Interactive Online Experience</span>
                </div>

                <p className="text-base md:text-lg text-summit-gray-200 font-medium">
                  March 7th & 8th • 10:00 AM - 11:30 AM PST
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section with Beige Background */}
      <div className="bg-[#D4C4B4] py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-summit-black text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-summit-black/10 pb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-summit-black">
                    {faq.question}
                  </h3>
                  <p className="text-summit-black/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="border-t border-summit-black/10 mt-20 pt-8">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center text-summit-black/60 text-sm">
              © Brilliant Perspectives 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 