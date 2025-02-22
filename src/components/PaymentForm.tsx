import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface PaymentFormProps {
  onSuccess: (paymentIntent: any) => void;
  amount: number;
  productName: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess, amount, productName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/final-thank-you`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent) {
        onSuccess(paymentIntent);
      }
    } catch (e) {
      setErrorMessage('An unexpected error occurred.');
      console.error('Payment error:', e);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="border-t border-white/[0.08] pt-6">
        <div className="flex justify-between mb-2">
          <span className="text-white/70">{productName}</span>
          <span className="text-white">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-white">Total</span>
          <span className="text-white">${amount.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 border border-white/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed relative"
      >
        <span className={isProcessing ? 'opacity-0' : ''}>
          Complete Purchase
        </span>
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </button>

      <p className="text-center text-white/40 text-sm">
        Your card will be charged ${amount.toFixed(2)}
      </p>
    </form>
  );
};

export default PaymentForm; 