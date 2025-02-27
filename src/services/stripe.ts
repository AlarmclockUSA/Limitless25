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
  console.log('[Stripe Service] Initializing checkout process...');
  
  try {
    const stripe = await getStripe();
    if (!stripe) {
      console.error('[Stripe Service] Stripe failed to load');
      throw new Error('Payment provider failed to load. Please refresh and try again.');
    }

    const priceId = process.env.REACT_APP_STRIPE_PRICE_ID;
    if (!priceId) {
      console.error('[Stripe Service] Price ID missing from environment variables');
      throw new Error('Payment configuration is incomplete. Please contact support.');
    }

    console.log('[Stripe Service] Redirecting to Stripe checkout with:', { 
      priceId,
      successUrl: `${window.location.origin}/all-access/thank-you`,
      cancelUrl: `${window.location.origin}/all-access`
    });

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/all-access/thank-you`,
      cancelUrl: `${window.location.origin}/all-access`,
      customerEmail: localStorage.getItem('allAccessEmail') || undefined,
    });

    if (error) {
      console.error('[Stripe Service] Checkout error:', error);
      throw error;
    }
  } catch (err) {
    console.error('[Stripe Service] Unexpected error in checkout process:', err);
    throw err;
  }
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