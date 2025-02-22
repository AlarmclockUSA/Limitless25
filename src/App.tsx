import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from './services/stripe';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import FinalThankYou from './pages/FinalThankYou';
import AllAccess from './pages/AllAccess';
import RegisterModal from './components/RegisterModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: { name: string; email: string }) => {
    setIsModalOpen(false);
  };

  const modalContextValue = {
    openModal: () => setIsModalOpen(true)
  };

  return (
    <Elements stripe={getStripe()}>
      <BrowserRouter>
        <ModalContext.Provider value={modalContextValue}>
          <div className="app-container bg-summit-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/final-thank-you" element={<FinalThankYou />} />
              <Route path="/all-access" element={<AllAccess />} />
            </Routes>
            
            <RegisterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </ModalContext.Provider>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
