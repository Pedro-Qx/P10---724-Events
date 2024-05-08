import PropTypes from "prop-types"; // ceci valide les props qui se passent avec react

import "./style.scss";

/* onClick: () => window.document.location.hash = "#contact" 
   onClick: () => null
    type: 1 ou 2
    title:contact
    disabled: !sending/ no hace el submit.
    NoEmptyFields: emptyFields.length > 0
*/

export const BUTTON_TYPES = { // objet avec 2 constantes: defalut et submit. quand on utilise 1 c'est default quand on utilise 2 c'es submit.
  DEFAULT: 1, // debug: DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({ title, onClick, type, disabled, children, openModal, formValues }) => {
  switch (type) { // si type a une valeur 1 c'est le bouton default qui se montre/ s'il a une valeur 2 c'est submit.
    case BUTTON_TYPES.DEFAULT:
      return (
        <button
          type="button"
          disabled={disabled}
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
        formValues === false ? (
        <button /* debug: <input> */ 
          disabled={!disabled}
          className="Button"
          type="submit"
          data-testid="button-test-id"
          onClick={openModal} // débug onClick={onClick} openModal
          title={title}
        >
          {children}
        </button>
      ):(
        <button /* debug: <input> */ 
        disabled={disabled}
        className="Button"
        type="submit"
        data-testid="button-test-id"
        onClick={openModal} // débug onClick={onClick} openModal
        title={title}
      >
        {children}
      </button>
      )
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
};
Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  type: 1, // debug: "button"
  title: "",
  children: null,
  openModal: null,
  formValues: false,
}

export default Button;