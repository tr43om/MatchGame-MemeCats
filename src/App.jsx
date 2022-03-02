import "./App.css";
import { SingleCard } from "./components/SingleCard";
import { Button } from "./components/Button";
import { useState, useEffect } from "react";

const cardImages = [
  { src: "/img/memecat1.jpg", matched: false },
  { src: "/img/memecat2.jpg", matched: false },
  { src: "/img/memecat3.jpg", matched: false },
  { src: "/img/memecat4.jpg", matched: false },
  { src: "/img/memecat5.jpg", matched: false },
  { src: "/img/memecat6.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    // if (cards.every((card) => card.matched === true)) setIsWin(true);
    // console.log(cards.every((card) => card.matched === true));
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  const handleCheck = () => {
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src !== choiceOne.src) return card;
          return { ...card, matched: true };
        });
      });

      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  };

  useEffect(() => {
    if (!choiceTwo) return;
    setDisabled(true);
    handleCheck();
  }, [choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setWin(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h2>MEME CATS MATCH GAME</h2>
      <Button shuffleCards={shuffleCards} />

      <div className="card-grid">
        {cards.map((card) =>
          // prettier-ignore
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        )}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
