import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BackgroundMusicManager from "../components/BackgroundMusicManager";
import Board from "../components/Board";

import "../styles/Game.css";

function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);

  if (!location.state) return null;

  const { name, difficulty } = location.state;

  const [soundOn, setSoundOn] = useState(true);

  const [moves, setMoves] = useState(0);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);



  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <div className="game-page">
      <BackgroundMusicManager src={`${import.meta.env.BASE_URL}sounds/bg-game.mp3`} play={!gameOver && soundOn} />
      <header className="game-header">
        <button className="icon-btn" onClick={() => navigate("/")}>
          <img src={`${import.meta.env.BASE_URL}images/icons/home.svg`} alt="Voltar" />
        </button>

        <div className="game-timer">{formatTime(time)}</div>

        <button className="icon-btn" onClick={toggleSound}>
          <img
            src={
              soundOn
                ? `${import.meta.env.BASE_URL}images/icons/sound-on.png`
                : `${import.meta.env.BASE_URL}images/icons/sound-off.png`
            }
            alt="Som"
          />
        </button>
      </header>

      <section className="game-stats">
        <div className="stats-box">Player: {name}</div>
        <div className="stats-box">Movimentos: {moves}</div>
        <div className="stats-box">Pontos: {points}</div>
      </section>

      <main className="game-board">
        <Board
          difficulty={difficulty}
          setMoves={setMoves}
          setPoints={setPoints}
          onGameOver={() => setGameOver(true)}
          moves={moves}
          time={time}
          soundOn={soundOn}
          onRestart={handleReload}
          name={name}
        />
      </main>
    </div>
  );
}

export default Game;