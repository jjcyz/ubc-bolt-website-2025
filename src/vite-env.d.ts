/// <reference types="vite/client" />

/**
 * Type declarations for asset imports
 */

// JSON module declarations
declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}

// Image module declarations
declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

// CSS module declarations are handled by Vite automatically
