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

export const redirectToCheckout = async () => {
  const stripe = await getStripe();
  if (!stripe) throw new Error('Stripe failed to load');

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const email = params.get('email');

  const priceId = process.env.REACT_APP_STRIPE_PRICE_ID;
  if (!priceId) throw new Error('Stripe price ID not configured');

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/all-access/thank-you?email=${email || ''}`,
    cancelUrl: `${window.location.origin}/all-access`,
    customerEmail: email || undefined,
  });

  if (error) throw error;
};

interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (amount: number): Promise<CreatePaymentIntentResponse> => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Payment intent creation failed:', errorData);
    throw new Error('Failed to initialize payment. Please try again later.');
  }

  return response.json();
}; 