/// <reference types="react-scripts" />

// Extend Window interface for Facebook Pixel and Google Analytics
interface Window {
  fbq?: (event: string, action: string, params?: any) => void;
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}
