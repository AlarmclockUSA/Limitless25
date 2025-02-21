import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { registerContact } from '../services/registration';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', submit: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset states when modal closes
      setName('');
      setEmail('');
      setErrors({ name: '', email: '', submit: '' });
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setErrors({ name: '', email: '', submit: '' });
    setIsLoading(true);
    
    // Validate
    let hasErrors = false;
    if (!name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
      hasErrors = true;
    }
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      hasErrors = true;
    }

    if (!hasErrors) {
      try {
        const result = await registerContact({
          email: email.trim(),
          firstName: name.trim(),
        });

        if (!result.success) {
          throw new Error('Registration failed. Please try again.');
        }

        // Call the onSubmit prop
        onSubmit({ name: name.trim(), email: email.trim() });
        
        // Show success state
        setIsSuccess(true);
        
        // Navigate directly to thank you page with purchase details
        navigate(`/thank-you?name=${encodeURIComponent(name.trim())}&email=${encodeURIComponent(email.trim())}&product=all-access-pass&price=49&description=${encodeURIComponent("Lifetime Access + Digital Book")}`);
      } catch (error) {
        console.error('Registration error:', error);
        setErrors(prev => ({ 
          ...prev, 
          submit: error instanceof Error 
            ? error.message 
            : 'Unable to complete registration. Please try again later or contact support if the issue persists.' 
        }));
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="relative w-full max-w-[min(calc(100vw-2rem),28rem)] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Success overlay */}
        {isSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
            <div className="text-center px-4 sm:px-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Registration Complete!
              </h3>
              <p className="text-gray-600">
                Redirecting you to the next steps...
              </p>
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFB347]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
              Reserve Your Free Spot
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm whitespace-nowrap">
                March 7th & 8th
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm whitespace-nowrap">
                10:00 AM PST
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter your name"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {errors.submit && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:from-[#FF8787] hover:to-[#FFC347] transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20 relative ${
                isLoading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              <span className={isLoading ? 'opacity-0' : ''}>
                Reserve My Spot
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </button>
          </form>

          <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
            By registering, you'll receive event updates and inspiration from Brilliant Perspectives.{' '}
            <span className="block mt-1 text-xs">You can unsubscribe at any time.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal; 