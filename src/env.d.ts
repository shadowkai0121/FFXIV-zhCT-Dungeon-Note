/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
