import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerContact } from '../services/registration';

const AllAccessThankYou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [webhookStatus, setWebhookStatus] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    // Get email from URL query parameters
    const params = new URLSearchParams(location.search);
    let email = params.get('email') || '';
    
    // If email not found in URL, check localStorage
    if (!email) {
      const storedEmail = localStorage.getItem('allAccessEmail');
      if (storedEmail) {
        email = storedEmail;
        console.log('AllAccessThankYou: Retrieved email from localStorage', { email });
      } else {
        console.warn('AllAccessThankYou: No email found in URL parameters or localStorage');
      }
    } else {
      console.log('AllAccessThankYou: Found email in URL', { email });
    }
    
    if (email) {
      // Force tracking of the completed purchase
      const trackPurchase = async () => {
        try {
          console.log('AllAccessThankYou: Sending webhook for completed purchase');
          const result = await registerContact({
            firstName: 'All Access Customer', // Generic name for tracking
            email: email.trim(),
            isPaidRegistration: true,
            paymentCompleted: true // Flag indicating payment is complete
          });
          
          console.log('AllAccessThankYou: Webhook sent successfully', result);
          setWebhookStatus('success');
          
          // Send to Facebook Pixel if available
          if (window.fbq) {
            window.fbq('track', 'Purchase', {value: 37.00, currency: 'USD'});
            console.log('AllAccessThankYou: Facebook Pixel purchase event fired');
          }
          
          // Send to Google Analytics if available
          if (window.gtag) {
            window.gtag('event', 'purchase', {
              transaction_id: new Date().getTime().toString(),
              value: 37.00,
              currency: 'USD',
              items: [{
                id: 'all-access-pass',
                name: 'LIMITLESS All Access Pass',
                quantity: 1,
                price: 37.00
              }]
            });
            console.log('AllAccessThankYou: Google Analytics purchase event fired');
          }
          
        } catch (error) {
          console.error('AllAccessThankYou: Error registering completed purchase:', error);
          setWebhookStatus('error');
          
          // Retry once after 2 seconds
          setTimeout(() => {
            console.log('AllAccessThankYou: Retrying webhook...');
            registerContact({
              firstName: 'All Access Customer (Retry)', 
              email: email.trim(),
              isPaidRegistration: true,
              paymentCompleted: true
            }).catch(e => console.error('AllAccessThankYou: Retry also failed:', e));
          }, 2000);
        }
      };

      // Execute tracking immediately
      trackPurchase();
      
      // Debug output to console all environment variables
      console.log('AllAccessThankYou: Environment variables:', {
        REACT_APP_PAID_REGISTRATION_WEBHOOK_URL: process.env.REACT_APP_PAID_REGISTRATION_WEBHOOK_URL,
        REACT_APP_ZAPIER_WEBHOOK_URL: process.env.REACT_APP_ZAPIER_WEBHOOK_URL
      });
    } else {
      console.warn('AllAccessThankYou: No email found in URL parameters or localStorage');
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-summit-black text-summit-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Welcome to LIMITLESS All Access!
            </h1>

            <p className="text-xl text-summit-gray-200 text-center mb-12">
              Thank you for your purchase. Here's what happens next:
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-summit-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
                  <p className="text-summit-gray-300">We've sent your purchase confirmation and access details to your email</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-summit-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Access Your Content</h3>
                  <p className="text-summit-gray-300">Your All Access portal link will be delivered to your inbox within the next 5 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-summit-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Download Your Book</h3>
                  <p className="text-summit-gray-300">Your digital copy of "The Nature of Freedom" will be available in your portal</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-xl">
              <h4 className="text-lg font-semibold mb-2">Need Help?</h4>
              <p className="text-summit-gray-300">
                If you don't receive your access details within 5 minutes, please check your spam folder or contact our support team at help@brilliantperspectives.com
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-200"
            >
              Return to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllAccessThankYou; 