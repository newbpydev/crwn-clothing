import React from "react";

import "./form-input.styles.scss";

export default function FormInput({ label, labelFor, ...otherProps }) {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          htmlFor={labelFor}
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
