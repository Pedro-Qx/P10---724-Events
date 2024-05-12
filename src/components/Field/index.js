import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  EMAIL: 3,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, onValueChange, isEmail, clear }) => {
  const [error, setError] = useState(false); // si les champs ne sont pas remplis.
  const [completed, setCompleted] = useState(false); // si tous les champs sont bien remplis.
  const [fieldValue, setFieldValue] = useState("");

  /* Ce useEffect permet de vider les champs. clear est une prop qui vient de button 
  et qui a une valeur true lorsque je fais click sur submit */
  useEffect(() => {
    if (clear) {
      setFieldValue(""); 
      setCompleted(false);
    }
  }, [clear]);
  
  /* cette fonction verifie si les champs sont remplis ou pas. 
  Si non elle donne la valeur true au state error */
  const handleChange = (event) => {
    const inputValue = event.target.value; 
    setFieldValue(inputValue); 
    onValueChange(inputValue); 
      if (inputValue === "" && !completed) {
      setError(true);
    } else {
      setError(false);
      setCompleted(true);
    }
  };
  /* ces variables permette de changer de style et afficher un message d'erreur quand les champs en sont pas remplis */
  const inputClasses = error ? "input_error" : "input";
  const inputClassEmail = error ? "input_error" : "input_email";
  const textareaClasses = error ? "textarea_error" : "textarea";
  const errorMssg = "(Veillez compléter ce champ)";

  const component = type === FIELD_TYPES.INPUT_TEXT ? (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={fieldValue}
      onChange={handleChange}
      onBlur={handleChange}
      className={isEmail ? inputClassEmail : inputClasses}
      data-testid="field-testid"
    />
  ) : (
    <textarea
      name={name}
      placeholder={placeholder}
      value={fieldValue}
      onChange={handleChange}
      onBlur={handleChange}
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
    ) : (
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
  onValueChange: PropTypes.func,
  isEmail: PropTypes.bool,
  clear: PropTypes.bool,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  onValueChange: () => null,
  isEmail: false,
  clear: false,
};

export default Field;
