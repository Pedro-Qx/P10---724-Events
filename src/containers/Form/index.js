import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import Field, { FIELD_TYPES } from "../../components/Field";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); });

const Form = ({ onSuccess, onError}) => {
  const [sending, setSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const handleInputChange = (value) =>{
    setInputValue(value);
  };
  
  const sendContact = useCallback(
   async (evt) => {
      evt.preventDefault();
  
      try {
        setSending(true); // Indicar que se está enviando
        await mockContactApi();
        setSending(false);
        onSuccess(); // Llamar a la función onSuccess si la llamada es exitosa
      } catch (err) {
        setSending(false);
        onError(err); // Llamar a la función onError si hay un error
      }
    },
    [onSuccess, onError, inputValue]
    
  );
  console.log(inputValue && inputValue);
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field 
            label="Nom"
            name="nom" 
            onValueChange={handleInputChange}
            /> 
          <Field 
            label="Prénom"
            name="prenom" 
            onValueChange={handleInputChange}
            />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field 
            label="Email" 
            name="email" 
            onValueChange={handleInputChange}
            />
        </div>
        <div className="col">
          <Field
            type={FIELD_TYPES.TEXTAREA}
            placeholder="message"
            label="Message"
            name="message"
            onValueChange={handleInputChange}
          />
        <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} openModal={onSuccess}  formValues={inputValue}/* {emptyFields.length > 0} */ >        
            {sending ? "En cours" : "Envoyer"}
        </Button>

        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
