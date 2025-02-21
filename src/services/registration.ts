import axios from 'axios';

interface Contact {
  email: string;
  firstName: string;
}

const WEBHOOK_URL = process.env.REACT_APP_ZAPIER_WEBHOOK_URL;

interface WebhookResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export const registerContact = async (contact: Contact) => {
  if (!WEBHOOK_URL) {
    throw new Error('Webhook URL not configured');
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