import React from "react";
import PropTypes from "prop-types";
import "./button.css";

/**
 * Generating classNames for the button based on the BEM modifiers.
 *
 * @param {Array} variant Array of viarant the can be used to generate classNames
 * @returns {string}
 */
const getClassNames = modifiers =>
  modifiers.map(modifier => `button--${modifier}`).join(" ");

const Button = ({ name, variant, children, ...props }) => {
  const classNames = getClassNames(variant);

  return (
    <button className={`button ${classNames}`} {...props}>
      {children && children}
    </button>
  );
};

Button.defaultProps = {
  children: null
};

Button.propTypes = {
  variant: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

export default Button;
