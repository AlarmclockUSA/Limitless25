import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AllAccess: React.FC = () => {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stripe integration will go here
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img 
            src="/Brilliant_Full-Color_White.png" 
            alt="Brilliant"
            className="h-12 md:h-16 mx-auto"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] rounded-[32px] p-8 md:p-10 text-center border border-white/[0.08]"
          >
            <div className="inline-flex items-center bg-[#2A2A2A] rounded-full px-5 py-2 mb-8 border border-white/[0.08]">
              <span className="mr-2">🎁</span>
              <span className="text-[15px] font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Special Offer</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent leading-[1.2]">
              LIMITLESS All Access Pass
            </h1>

            <div className="flex items-baseline justify-center gap-4 mb-8">
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">$49</span>
              <div className="text-left">
                <span className="block text-[15px] text-white/80">one-time payment</span>
                <span className="text-sm text-white/60 line-through">Regular price $97</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#222] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                  <svg className="w-6 h-6 text-[#FFB347]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Event Recordings</h3>
                  <p className="text-white/70">Lifetime access to all session recordings</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#222] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                  <svg className="w-6 h-6 text-[#FFB347]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Digital Book</h3>
                  <p className="text-white/70">Graham's "The Nature of Freedom" (Value: $24.99)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#222] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                  <svg className="w-6 h-6 text-[#FFB347]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Instant Access</h3>
                  <p className="text-white/70">Start watching immediately after purchase</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] rounded-[32px] p-8 md:p-10 border border-white/[0.08]"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent mb-8">
              Complete Purchase
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#FFB347]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={cardDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-white/[0.08] text-white placeholder-white/40 focus:outline-none focus:border-[#FFB347]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Card Details
                </label>
                <div className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-white/[0.08] text-white/40">
                  Stripe Element will go here
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-white/70">All Access Pass</span>
                  <span className="text-white">$49.00</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">$49.00</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 border border-white/20 hover:opacity-90"
              >
                Complete Purchase
              </button>

              <p className="text-center text-white/40 text-sm">
                Your card will be charged $49.00
              </p>
            </form>

            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-white/[0.08]">
                  <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[13px] text-white/60">Secure checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-white/[0.08]">
                  <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[13px] text-white/60">30-day guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AllAccess; 