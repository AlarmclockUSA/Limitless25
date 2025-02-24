import axios from 'axios';

interface Contact {
  email: string;
  firstName: string;
  isPaidRegistration?: boolean;
}

// Get webhook URLs from environment variables
const FREE_WEBHOOK_URL = process.env.REACT_APP_ZAPIER_WEBHOOK_URL;
const PAID_WEBHOOK_URL = process.env.REACT_APP_PAID_REGISTRATION_WEBHOOK_URL;

// Debug logging
console.log('Environment variables:', {
  FREE_WEBHOOK_URL,
  PAID_WEBHOOK_URL,
  RAW_ENV: process.env
});

interface WebhookResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export const registerContact = async (contact: Contact) => {
  const webhookUrl = contact.isPaidRegistration ? PAID_WEBHOOK_URL : FREE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Webhook URL missing:', {
      isPaidRegistration: contact.isPaidRegistration,
      FREE_WEBHOOK_URL,
      PAID_WEBHOOK_URL
    });
    throw new Error('Webhook URL is not configured in environment variables. Please check your .env file.');
  }

  // Construct URL with separate name and email parameters
  const url = `${webhookUrl}?name=${encodeURIComponent(contact.firstName)}&email=${encodeURIComponent(contact.email)}`;

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