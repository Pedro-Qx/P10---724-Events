import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import Field, { FIELD_TYPES } from "../../components/Field";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 2000); });

const Form = ({ onSuccess, onError}) => {
  const [sending, setSending] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: "",
    prénom: "",
    selectValue: "",
    email: "",
    message: ""
  });
  const [formCompleted, setFormCompleted] = useState(false); 
  const [clicked, setClicked] = useState(false);
  
  const handleButtonClick = () => { 
    setClicked(!clicked);
  };

  useEffect (()=>{ // verifie que les champs soient complété.
    const isFormCompleted = Object.values(formValues).every((val) => val !== ""); 
    setFormCompleted(isFormCompleted);    
  }, [formValues]);
 
  
  const handleInputChange = (name, value) => { //valeurs que chaque formulaire (name) affiche. 
      setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
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
    [onSuccess, onError] // onSuccess: la modale s'ouvre  //
  );

    
  return (
    <form onSubmit={sendContact}> { /* appelle la fonction mockContactApi */ }
      <div className="row">
        <div className="col">
          <Field 
            label="Nom"
            name="nom" 
            onValueChange={(value)=> handleInputChange("nom", value)}
            clear={clicked}
            /> 
          <Field 
            label="Prénom"
            name="prénom" 
            onValueChange={(value)=> handleInputChange("prénom", value)}
            clear={clicked}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => handleInputChange("selectValue", value)} // onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            clear={clicked}           
          />
          <Field 
            label="Email" 
            name="email" 
            onValueChange={(value) => handleInputChange("email", value)}
            isEmail
            clear={clicked}
          />
        </div>
        <div className="col">
          <Field
            type={FIELD_TYPES.TEXTAREA}
            placeholder="message"
            label="Message"
            name="message"
            onValueChange={(value) => handleInputChange("message", value)}
            clear={clicked}
          />
        <Button 
          type={BUTTON_TYPES.SUBMIT} 
          disabled={sending} 
          openModal={onSuccess} 
          formValues={formCompleted} 
          onClickSend={handleButtonClick}
          > 
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
