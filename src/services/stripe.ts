import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error('Stripe publishable key is not configured in environment variables');
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export const redirectToCheckout = async (priceId: string) => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/final-thank-you`,
      cancelUrl: `${window.location.origin}/thank-you`,
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to redirect to checkout:', error);
    throw error;
  }
};

interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (amount: number): Promise<CreatePaymentIntentResponse> => {
  const PAYMENT_INTENT_ENDPOINT = process.env.REACT_APP_PAYMENT_INTENT_ENDPOINT;
  
  if (!PAYMENT_INTENT_ENDPOINT) {
    throw new Error('Payment intent endpoint is not configured in environment variables');
  }

  const response = await fetch(PAYMENT_INTENT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
      currency: 'usd',
      payment_method_types: ['card'],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Payment intent creation failed:', errorData);
    throw new Error('Failed to initialize payment. Please try again later.');
  }

  return response.json();
}; 