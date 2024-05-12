import PropTypes from "prop-types"; // ceci valide les props qui se passent avec react
import "./style.scss";
import { useState } from "react";

/* Props ****

  onClick: () => window.document.location.hash = "#contact" 
   onClick: () => null
    type: 1 ou 2
    title:contact
    disabled: !sending/ no hace el submit.
*/

export const BUTTON_TYPES = { // objet avec 2 constantes: defalut et submit. quand on utilise 1 c'est default quand on utilise 2 c'es submit.
  DEFAULT: 1, 
  SUBMIT: 2,
};

const Button = ({ title, onClick, type, disabled, children, openModal, formValues, onClickSend}) => {
  // state et fonction qui contrôlent le click sur le bouton submit et envoie en props une valeur false ou true.
  const [clicked, setClicked] = useState(false);
  const handleOnClick = (event) => {
    if (!clicked && openModal) {
      setClicked(true);
      openModal();
      onClickSend(true);
       }
    // Afin d'éviter que le formulaire s'envoie deux fois.
    event.stopPropagation();
  };

  switch (type) { // si type a une valeur 1 c'est le bouton default qui se montre/ s'il a une valeur 2 c'est submit.
    case BUTTON_TYPES.DEFAULT:
      return (
        <button
          type="button"
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          title={title}
        >
          {children} {/* contact ou envoyer */}
        </button>
      );
    case BUTTON_TYPES.SUBMIT:
      return (
        <button /* debug: <input> */ 
          // formValues a une valeur true si tout les formulaires ont étaient remplis.
          disabled={!formValues ? !disabled : disabled} 
          className="Button"
          type="submit"
          data-testid="button-test-id"
          /* OnClickSend est une prop qui vient du composant form. Lorsque je fais click, 
          la modale s'ouvre et le state s'actualise à true. form transmet ceci à field 
          pour pouvoir effacer les champs une fois que le formulaire est envoyé. */
          onClick={onClickSend ? handleOnClick : null}
          title={title}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          title={title}
        >
          {children}
        </button>
      );
  }
};

// eslint-disable-next-line react/no-typos
Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  openModal: PropTypes.func,
  formValues: PropTypes.bool,
  onClickSend: PropTypes.func,
};
Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  type: 1, // debug: "button"
  title: "",
  children: null,
  openModal: null,
  formValues: false,
  onClickSend: ()=> null,
}

export default Button;