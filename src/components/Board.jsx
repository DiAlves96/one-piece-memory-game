import { useEffect, useState } from "react";
import Card from "./Card";
import { generateDeck } from "../lib/deck";
import { playSound } from "../lib/sound";
import "../styles/Board.css";

function Board({ difficulty, setMoves, setPoints, onGameOver, moves, time, soundOn, onRestart }) {
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);

  useEffect(() => {
    setDeck(generateDeck(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setShowEndGame(false);
  }, [difficulty]);

  useEffect(() => {
    const totalPairs = generateDeck(difficulty).length / 2;
    if (matchedCards.length === totalPairs && totalPairs > 0) {
      setTimeout(() => {
        playSound(`${import.meta.env.BASE_URL}sounds/win.mp3`, soundOn);
        setShowEndGame(true);
        if (typeof onGameOver === "function") {
          onGameOver();
        }
      }, 500);
    }
  }, [matchedCards, difficulty, onGameOver]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleCardClick = (uuid, id) => {
    if (lockBoard || flippedCards.find(card => card.uuid === uuid) || matchedCards.includes(id)) return;

    playSound(`${import.meta.env.BASE_URL}sounds/flip.mp3`, soundOn);

    const newFlipped = [...flippedCards, { uuid, id }];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      if (setMoves) setMoves(m => m + 1);

      setTimeout(() => {
        const [first, second] = newFlipped;
        if (first.id === second.id) {
          setMatchedCards(prev => [...prev, first.id]);
          if (setPoints) setPoints(prev => prev + 1);
          playSound(`${import.meta.env.BASE_URL}sounds/match.mp3`, soundOn);
        } else {
          playSound(`${import.meta.env.BASE_URL}sounds/wismatch.mp3`, soundOn);
        }

        setFlippedCards([]);
        setLockBoard(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="board-container">
        <div className={`board ${difficulty}`}>
          {deck.map((card) => {
            const isFlipped =
              flippedCards.some(fc => fc.uuid === card.uuid) ||
              matchedCards.includes(card.id);

            return (
              <Card
                key={card.uuid}
                card={card}
                isFlipped={isFlipped}
                onClick={() => handleCardClick(card.uuid, card.id)}
              />
            );
          })}
        </div>
      </div>

      {showEndGame && (
        <div className="endgame-modal">
          <h2>Parabéns!</h2>
          <p>Você encontrou todos os pares!</p>
          <p><strong>Movimentos:</strong> {moves}</p>
          <p><strong>Tempo:</strong> {formatTime(time)}</p>
          <button onClick={onRestart}>Jogar Novamente</button>
        </div>
      )}
    </>
  );
}

export default Board;