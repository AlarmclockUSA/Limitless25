import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AddToCalendar from '../components/AddToCalendar';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Get URL parameters
  const params = new URLSearchParams(location.search);
  const [cardDetails, setCardDetails] = useState({
    name: params.get('name') || '',
    email: params.get('email') || '',
  });

  // Get purchase details from URL
  const purchaseDetails = {
    product: params.get('product') || 'all-access-pass',
    price: Number(params.get('price')) || 49,
    description: params.get('description') || 'Lifetime Access + Digital Book'
  };

  // Event details for calendar
  const eventDetails = {
    title: "LIMITLESS - Live Limitlessly With God",
    description: "Join Graham Cooke and Dionne van Zyl for this transformative virtual event. Experience practical insights for living in God's presence daily.",
    startDate: new Date('2024-03-07T18:00:00.000Z'), // 10:00 AM PST
    endDate: new Date('2024-03-07T19:30:00.000Z'), // 11:30 AM PST
    location: "Online Virtual Event"
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleNoThanks = () => {
    navigate('/final-thank-you');
  };

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
          {/* Left Column - Confirmation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] rounded-[32px] p-8 md:p-10 text-center border border-white/[0.08]"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent">
              Registration Confirmed!
            </h1>

            <p className="text-xl text-white/70 mb-8">
              You're all set for LIMITLESS. Check your email for event details.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#222] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                  <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Event Dates</h3>
                  <p className="text-white/70">March 7th & 8th • 10:00 AM - 11:30 AM PST</p>
                  <div className="mt-2">
                    <AddToCalendar event={eventDetails} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#222] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                  <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-medium bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">Check Your Email</h3>
                  <p className="text-white/70">We've sent your confirmation and access details</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Offer or Checkout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] rounded-[32px] p-8 md:p-10 text-center border border-white/[0.08]"
          >
            {!isCheckingOut ? (
              <>
                {/* Special Offer Tag */}
                <div className="inline-flex items-center bg-[#2A2A2A] rounded-full px-5 py-2 mb-8 border border-white/[0.08]">
                  <span className="mr-2">🎁</span>
                  <span className="text-[15px] font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">One-Time Special Offer</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent leading-[1.2]">
                  Get Lifetime Access
                </h2>

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
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 border border-white/20 hover:opacity-90"
                  >
                    Yes! I Want Lifetime Access - $49
                  </motion.button>

                  <button
                    onClick={handleNoThanks}
                    className="w-full text-white/60 px-8 py-4 text-[15px] hover:text-white/80 transition-colors duration-200"
                  >
                    No thanks, I'll pass on lifetime access
                  </button>
                </div>

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
              </>
            ) : (
              <form onSubmit={handleSubmit} className="text-left">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent">
                    Complete Purchase
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-white/60 hover:text-white/80 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6 mb-8">
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
                </div>

                <div className="border-t border-white/[0.08] pt-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">{purchaseDetails.description}</span>
                    <span className="text-white">${purchaseDetails.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="text-white">${purchaseDetails.price.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 border border-white/20 hover:opacity-90"
                >
                  Complete Purchase
                </button>

                <p className="text-center text-white/40 text-sm mt-4">
                  Your card will be charged ${purchaseDetails.price.toFixed(2)}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 