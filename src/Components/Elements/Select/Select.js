import React from "react";
import PropTypes, { arrayOf } from "prop-types";
import { getClassNames } from "../../../utils";
import "./select.css";

const Select = ({ options, modifiers, children, ...props }) => {
  const classNames = getClassNames("select", modifiers);

  return (
    <select className={`select ${classNames}`} {...props}>
      {children}
    </select>
  );
};

Select.defaultProps = {
  modifiers: []
};

Select.propTypes = {
  modifiers: arrayOf(PropTypes.string)
};

export default Select;
