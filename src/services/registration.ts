import axios from 'axios';

interface Contact {
  email: string;
  firstName: string;
  isPaidRegistration?: boolean;
  paymentCompleted?: boolean;
}

// Get webhook URLs from environment variables
const FREE_WEBHOOK_URL = process.env.REACT_APP_ZAPIER_WEBHOOK_URL;
const PAID_WEBHOOK_URL = process.env.REACT_APP_PAID_REGISTRATION_WEBHOOK_URL;

// Debug logging - this will show in the console when the app starts
console.log('[Registration Service] Environment variables loaded:', {
  FREE_WEBHOOK_URL: FREE_WEBHOOK_URL ? 'CONFIGURED' : 'MISSING',
  PAID_WEBHOOK_URL: PAID_WEBHOOK_URL ? 'CONFIGURED' : 'MISSING'
});

interface WebhookResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
}

export const registerContact = async (contact: Contact) => {
  // Determine which webhook URL to use
  const webhookUrl = contact.isPaidRegistration ? PAID_WEBHOOK_URL : FREE_WEBHOOK_URL;

  // Debug - which webhook are we using
  console.log('[Registration Service] Using webhook:', {
    type: contact.isPaidRegistration ? 'PAID' : 'FREE',
    paymentCompleted: contact.paymentCompleted || false
  });

  if (!webhookUrl) {
    console.error('[Registration Service] Webhook URL missing:', {
      isPaidRegistration: contact.isPaidRegistration,
      FREE_WEBHOOK_URL,
      PAID_WEBHOOK_URL
    });
    throw new Error('Webhook URL is not configured in environment variables. Please check your .env file.');
  }

  // Construct URL with separate name and email parameters
  let url = `${webhookUrl}?name=${encodeURIComponent(contact.firstName)}&email=${encodeURIComponent(contact.email)}`;
  
  // Add paymentCompleted parameter if it exists
  if (contact.paymentCompleted) {
    url += `&paymentCompleted=true`;
  }

  console.log('[Registration Service] Sending webhook request:', {
    url: url,
    contact: {
      name: contact.firstName,
      email: contact.email,
      isPaidRegistration: contact.isPaidRegistration,
      paymentCompleted: contact.paymentCompleted
    }
  });

  try {
    // Use a more reliable approach that won't block the main process
    // This ensures the webhook request doesn't delay or block the checkout process
    const sendWebhook = () => {
      // Try with fetch first
      fetch(url, {
        method: 'GET', // Changed to GET for better compatibility
        // Removed no-cors mode to allow proper response handling
      })
      .then(response => {
        console.log('[Registration Service] Webhook request completed via fetch:', response.status);
      })
      .catch(fetchError => {
        console.warn('[Registration Service] Fetch method failed, trying XMLHttpRequest:', fetchError);
        
        // Fallback to XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true); // Changed to GET for better compatibility
        xhr.onload = () => {
          console.log('[Registration Service] XMLHttpRequest completed with status:', xhr.status);
        };
        xhr.onerror = (xhrError) => {
          console.error('[Registration Service] XMLHttpRequest failed:', xhrError);
        };
        xhr.send();
      });
    };
    
    // Execute webhook in the background without awaiting
    sendWebhook();
    
    // Return success immediately to prevent blocking the checkout flow
    return {
      success: true,
      requestId: 'webhook-submitted-async',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    // This should rarely happen as we're not awaiting the request
    console.error('[Registration Service] Unexpected error in webhook submission:', error);
    
    // Don't throw an error here, as it would block the checkout flow
    // Just return success and let the checkout continue
    return {
      success: true,
      requestId: 'webhook-submitted-with-error',
      timestamp: new Date().toISOString()
    };
  }
}; 