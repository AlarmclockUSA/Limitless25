import React, { createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from './services/stripe';
import { Analytics } from '@vercel/analytics/react';
import RedirectPage from './components/RedirectPage';
import './App.css';

// Debug - remove after fixing
console.log('App.tsx - Environment Variables:', {
  WEBHOOK_URL: process.env.REACT_APP_ZAPIER_WEBHOOK_URL,
  STRIPE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
});

// Create context for modal control
interface ModalContextType {
  openModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
});

function App() {
  // Create a simplified context value since we're just redirecting
  const modalContextValue = {
    openModal: () => console.log('Modal functionality disabled during redirect')
  };

  return (
    <Elements stripe={getStripe()}>
      <BrowserRouter>
        <ModalContext.Provider value={modalContextValue}>
          <div className="app-container bg-summit-black">
            <Routes>
              {/* Redirect all routes to the RedirectPage */}
              <Route path="*" element={<RedirectPage />} />
            </Routes>
            <Analytics />
          </div>
        </ModalContext.Provider>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
