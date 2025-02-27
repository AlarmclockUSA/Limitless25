import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { redirectToCheckout } from '../services/stripe';
import { registerContact } from '../services/registration';

const AllAccess: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    email: '',
  });

  // Enhanced email validation function
  const isValidEmail = (email: string): boolean => {
    // Simple check first
    if (!email || email.trim() === '') return false;
    
    // More comprehensive regex for basic email validation
    // This checks for a proper format with @ symbol, domain, and TLD
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;
    
    // Additional validation checks
    const trimmedEmail = email.trim().toLowerCase();
    
    // Check for common disposable email domains
    const disposableDomains = [
      'tempmail.com', 'throwmail.com', 'mailinator.com', 
      'yopmail.com', 'guerrillamail.com', 'sharklasers.com',
      'temp-mail.org', '10minutemail.com', 'tempmail.net'
    ];
    
    const domain = trimmedEmail.split('@')[1];
    if (disposableDomains.includes(domain)) return false;
    
    // Check for obviously fake names in email
    const fakePrefixes = ['test', 'fake', 'noreply', 'spam', 'aaa', 'bbb', 'xyz', '123', 'none'];
    const prefix = trimmedEmail.split('@')[0];
    if (fakePrefixes.some(fake => prefix === fake)) return false;
    
    // Check for repeated characters (more than 3)
    if (/(.)\1{3,}/.test(trimmedEmail)) return false;
    
    // Reasonable minimum and maximum length
    if (trimmedEmail.length < 5 || trimmedEmail.length > 100) return false;
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Validate inputs first
      if (!cardDetails.name.trim()) {
        throw new Error('Please enter your name');
      } else if (cardDetails.name.trim().length < 2) {
        throw new Error('Please enter your full name');
      }

      if (!cardDetails.email.trim()) {
        throw new Error('Please enter your email address');
      } else if (!isValidEmail(cardDetails.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('Starting checkout process...');
      
      // Save email to localStorage for retrieval after Stripe redirect
      const email = cardDetails.email.trim();
      localStorage.setItem('allAccessEmail', email);
      localStorage.setItem('allAccessName', cardDetails.name.trim());
      console.log('Saved customer details to localStorage for checkout completion');
      
      // Register the contact first with separate name and email parameters
      try {
        await registerContact({
          firstName: cardDetails.name.trim(),
          email: email,
          isPaidRegistration: true // Add this flag to indicate it's a paid registration
        });
        console.log('Contact registration successful');
      } catch (regError) {
        // Log but don't block checkout if registration fails
        console.error('Registration error:', regError);
        // Continue with checkout even if registration fails
      }
      
      // Redirect to Stripe Checkout
      console.log('Redirecting to Stripe checkout...');
      await redirectToCheckout();
    } catch (err) {
      console.error('Checkout error:', err);
      // Provide more specific error message when possible
      if (err instanceof Error) {
        setError(err.message || 'Unable to proceed to checkout. Please try again.');
      } else {
        setError('Unable to proceed to checkout. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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
              Get Event Recordings
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
                  <h3 className="font-medium bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">BONUS: E-book</h3>
                  <p className="text-white/70">Graham's "The Nature of Freedom" (Value: $24.99)</p>
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

            <div className="space-y-6">
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
                  required
                  autoComplete="name"
                  aria-required="true"
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
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 border border-white/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed relative"
                >
                  <span className={isLoading ? 'opacity-0' : ''}>
                    Complete Purchase - $49
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </motion.button>

                {error && (
                  <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}
              </div>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AllAccess; 