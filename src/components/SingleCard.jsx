import "./SingleCard.css";
import useSound from "use-sound";
import wow from "../sounds/wow.mp3";

export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const [playWow] = useSound(wow, { volume: 0.25 });
  const handleClick = () => {
    if (disabled) return;
    playWow();
    handleChoice(card);
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        {/* prettier-ignore */}
        <img 
          className="front" 
          src={card.src} 
          alt="card front" />
        {/* prettier-ignore */}
        <img
          className="back"
          src="./img/cover.jpg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};
