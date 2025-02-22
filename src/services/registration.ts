import axios from 'axios';

interface Contact {
  email: string;
  firstName: string;
}

// Get webhook URL from environment variables
const WEBHOOK_URL = process.env.REACT_APP_ZAPIER_WEBHOOK_URL;

// Debug logging
console.log('Environment variables:', {
  WEBHOOK_URL,
  RAW_ENV: process.env.REACT_APP_ZAPIER_WEBHOOK_URL
});

interface WebhookResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export const registerContact = async (contact: Contact) => {
  if (!WEBHOOK_URL) {
    console.error('Webhook URL missing:', {
      envVar: process.env.REACT_APP_ZAPIER_WEBHOOK_URL,
      WEBHOOK_URL
    });
    throw new Error('REACT_APP_ZAPIER_WEBHOOK_URL is not configured in environment variables. Please check your .env file.');
  }

  const url = `${WEBHOOK_URL}?email=${encodeURIComponent(contact.email)}&name=${encodeURIComponent(contact.firstName)}`;

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors'
    });

    return {
      success: true,
      requestId: 'webhook-submitted'
    };
  } catch (error) {
    console.error('Failed to submit registration:', error);
    throw new Error('Failed to process registration. Please try again later.');
  }
}; 