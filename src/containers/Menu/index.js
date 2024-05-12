/* eslint-disable no-return-assign */
import Button, { BUTTON_TYPES } from "../../components/Button"; // débug: import Button from "../../components/Button"; //
import Logo from "../../components/Logo";
import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services">Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe">Notre équipe</a>
      </li>
    </ul>
    <Button  type={BUTTON_TYPES.DEFAULT} onClick={() => window.location.assign("#contact")}>
      Contact
    </Button>
  </nav>
);


export default Menu;
// si le bouton reçois BUTTON_TYPES.CONTACT, s'affiche Contact, s'il reçois ENVOYER affiche Envoyer.