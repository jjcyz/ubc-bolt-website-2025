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
 * Site metadata for SEO and display
 */
export const SITE_META = {
  /** Site title */
  title: 'BOLT UBC',

  /** Site description for meta tags */
  description:
    'Bolt provides an enriching platform that fosters collaboration, presents intellectually stimulating challenges, and facilitates hands-on experiences. This unique opportunity is open to students from diverse backgrounds, inviting them to immerse themselves in the dynamic realm of business technology.',

  /** Organization name */
  organizationName: 'BOLT UBC',

  /** Copyright year (can be updated annually) */
  copyrightYear: 2025,

  /** Organization email */
  email: 'boltubc@gmail.com',
} as const;

/**
 * Helper function to get copyright text
 */
export const getCopyrightText = (): string => {
  return `Copyright © ${SITE_META.organizationName} ${SITE_META.copyrightYear}`;
};

