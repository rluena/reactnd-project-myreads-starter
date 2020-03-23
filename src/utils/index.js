/**
 * Generating classNames for the button based on the BEM modifiers.
 *
 * @param {Array} variant Array of viarant the can be used to generate classNames
 * @returns {string}
 */
export const getClassNames = (element, modifiers) =>
  modifiers.map(modifier => `${element}--${modifier}`).join(" ");
