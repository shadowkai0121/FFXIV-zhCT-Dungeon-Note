/// <reference types="astro/client" />

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
