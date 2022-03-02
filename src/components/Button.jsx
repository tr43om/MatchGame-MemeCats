import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
export const Button = ({ shuffleCards }) => {
  return (
    <button onClick={shuffleCards}>
      <FontAwesomeIcon icon={faPaw} /> New Game
    </button>
  );
};
