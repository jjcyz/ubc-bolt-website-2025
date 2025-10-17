/**
 * Utility functions for asset URL generation
 */

/**
 * Gets the base URL for public assets
 * @returns The base URL from Vite environment
 */
export const getBaseUrl = (): string => {
  return import.meta.env.BASE_URL || '/';
};

/**
 * Generates a full URL for a public asset
 * @param path - Relative path from the public directory
 * @returns Full URL to the asset
 * @example
 * getPublicAssetUrl('events/bootcamp.webp') // -> '/events/bootcamp.webp'
 */
export const getPublicAssetUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generates a URL for a team member's profile picture
 * @param filename - Name of the profile picture file
 * @returns Full URL to the profile picture
 * @example
 * getProfileUrl('John.webp') // -> '/profiles/John.webp'
 */
export const getProfileUrl = (filename: string): string => {
  return getPublicAssetUrl(`profiles/${filename}`);
};

/**
 * Generates a URL for an event image
 * @param filename - Name of the event image file
 * @returns Full URL to the event image
 * @example
 * getEventImageUrl('bootcamp.webp') // -> '/events/bootcamp.webp'
 */
export const getEventImageUrl = (filename: string): string => {
  return getPublicAssetUrl(`events/${filename}`);
};

