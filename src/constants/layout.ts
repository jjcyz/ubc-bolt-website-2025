/**
 * Layout and spacing constants used throughout the application
 */

/**
 * Navigation constants
 */
export const NAVIGATION = {
  /** Height of the fixed navbar in pixels */
  NAVBAR_HEIGHT: 60,
  /** Offset from section top for scroll detection in pixels */
  SECTION_DETECTION_OFFSET: 200,
  /** Duration for smooth scroll animation in milliseconds */
  SCROLL_ANIMATION_DURATION: 700,
} as const;

/**
 * Carousel and scrolling constants
 */
export const CAROUSEL = {
  /** Amount to scroll horizontally when using navigation buttons in pixels */
  SCROLL_AMOUNT: 200,
} as const;

/**
 * Parallax effect values for About section
 */
export const PARALLAX = {
  moon: {
    translateX: [-20, 20] as [number, number],
    translateY: [-50, 50] as [number, number],
  },
  clouds: {
    translateX: [-33, -70] as [number, number],
  },
  stars: {
    rotate: [-30, 30] as [number, number],
    translateX: [-20, 20] as [number, number],
    translateY: [5, -5] as [number, number],
  },
} as const;

