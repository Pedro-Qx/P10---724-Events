import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(false); // Al cambiar el valor, reiniciamos el estado de error
  };

  const handleBlur = () => {
    if (!value.trim()) {
      setError(true);
    }
  };

  const inputClasses = error ? "input_error" : "input";
  const textareaClasses = error ? "textarea_error" : "textarea";
  const errorMssg = "(Veillez compléter ce champ)";

  const component = type === FIELD_TYPES.INPUT_TEXT ? (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={inputClasses}
      data-testid="field-testid"
    />
  ) : (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={textareaClasses}
      data-testid="field-testid"
    />
  );

  return (
    error ? (
    <div className="inputField">
      <span>{`${label} ${errorMssg}`}</span>
      {component}
    </div>
    ):(
      <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
    )
  );
};


Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
};

export default Field;