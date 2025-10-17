/**
 * Utility functions for DOM manipulation
 */

/**
 * Safely queries a DOM element with error handling
 * @param selector - CSS selector string
 * @returns The found element or null
 */
export const querySelector = <T extends Element = Element>(
  selector: string
): T | null => {
  return document.querySelector<T>(selector);
};

/**
 * Scrolls an element horizontally by a specified amount
 * @param selector - CSS selector for the element
 * @param amount - Amount to scroll (positive for right, negative for left)
 * @returns True if successful, false if element not found
 * @example
 * scrollHorizontal('.carousel', 200) // Scroll right 200px
 * scrollHorizontal('.carousel', -200) // Scroll left 200px
 */
export const scrollHorizontal = (
  selector: string,
  amount: number
): boolean => {
  const element = querySelector(selector);
  if (element) {
    element.scrollLeft += amount;
    return true;
  }
  return false;
};

/**
 * Scrolls to a specific element with smooth behavior
 * @param elementId - ID of the target element
 * @param offset - Offset from the top in pixels (default: 0)
 * @returns True if successful, false if element not found
 */
export const scrollToElement = (
  elementId: string,
  offset: number = 0
): boolean => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    return true;
  }
  return false;
};

