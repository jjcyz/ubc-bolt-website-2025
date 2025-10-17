/**
 * Site-wide configuration
 * Centralized place for all URLs, contact info, and site metadata
 */

/**
 * Contact and membership URLs
 */
export const SITE_URLS = {
  /** Membership signup URL (LinkTree) */
  membership: 'https://tr.ee/aHbQ0EMil7',

  /** Sponsorship inquiry email with pre-filled subject */
  sponsorEmail: 'mailto:boltubc@gmail.com?subject=Sponsorship Inquiry',

  /** General contact email */
  contactEmail: 'mailto:boltubc@gmail.com',
} as const;

/**
 * Social media profile URLs
 */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/bolt-ubc/',
  instagram: 'https://www.instagram.com/bolt.ubc/',
  facebook: 'https://www.facebook.com/BOLTUBC',
} as const;

/**
 * Helper function to get copyright text
 */
export const getCopyrightText = (): string => {
  return `Copyright © BOLT UBC ${new Date().getFullYear()}`;
};

