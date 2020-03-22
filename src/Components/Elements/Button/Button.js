import React from "react";
import PropTypes from "prop-types";
import { getClassNames } from "../../../utils";
import "./button.css";

const Button = ({ name, modifiers, children, ...props }) => {
  const classNames = getClassNames("button", modifiers);

  return (
    <button className={`button ${classNames}`} {...props}>
      {children && children}
    </button>
  );
};

Button.defaultProps = {
  children: null,
  modifiers: []
};

Button.propTypes = {
  modifiers: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node
};

export default Button;
