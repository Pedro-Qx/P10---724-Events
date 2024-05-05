import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]); // Estado para mantener un seguimiento de los campos vacíos // regarder 
  
  const sendContact = useCallback(
   

    async (evt) => {
      evt.preventDefault();
           

      // Validar los campos antes de enviar
      const formElements = evt.target.elements;
      const emptyFieldsArray = [];
     
      
      for (let i = 0; i < formElements.length; i+=1) {
        const element = formElements[i];
        if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") && !element.value.trim()) {
          // Si el campo está vacío, marcarlo con la clase de error y agregarlo al array de campos vacíos
          emptyFieldsArray.push(element.name);
          element.classList.add("input_error");
          
        }
      }

      setEmptyFields(emptyFieldsArray); // Actualizar el estado con los campos vacíos
      console.log(emptyFieldsArray && emptyFieldsArray)
      
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
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" 
            label={emptyFields.includes("nom") ? "Nom (Veuillez compléter ce champ)" : "Nom"}
            name="nom" /> 
          <Field placeholder=""
            label={emptyFields.includes("prenom") ? "Prénom (Veuillez compléter ce champ)" : "Prénom"}
            name="prenom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label={emptyFields.includes("selection") ? "Personel / Entreprise (Veillez compléter ce champ)" : "Personel / Entreprise"}
            type="large"
            titleEmpty
          />
          <Field placeholder="" 
            label={emptyFields.includes("email") ? "Email (Veuillez compléter ce champ)" : "Email"} 
            name="email" />
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label={emptyFields.includes("message") ? "Message (Veuillez compléter ce champ)" : "Message"}
            name="message"
            type={FIELD_TYPES.TEXTAREA}
          />
        <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} openModal={onSuccess} NoEmptyFields={emptyFields.length > 0}>          
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
