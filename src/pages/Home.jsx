import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundMusicManager from "../components/BackgroundMusicManager";
import "../styles/Home.css";

function Home() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [soundOn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startGame = () => {
    if (!name.trim()) {
      alert("Digite seu nome primeiro!");
      return;
    }
    navigate("/loading", { state: { name, difficulty } });
  };

  return (
    <>
      <BackgroundMusicManager src={`${import.meta.env.BASE_URL}sounds/background-music.mp3`}play={soundOn} />

      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        key={isMobile ? "mobile" : "desktop"}
      >
        <source
          src={
            isMobile
              ? `${import.meta.env.BASE_URL}videos/bg-mobile.mp4`
              : `${import.meta.env.BASE_URL}videos/bg-desktop.mp4`
          }
          type="video/mp4"
        />
      </video>

      <div className="home-container">
        <img
          src={`${import.meta.env.BASE_URL}images/logo-home.png`}
          alt="Logo One Piece"
          className="logo" />

        <label htmlFor="player" className="label">Nome do Jogador</label>
        <input
          id="player"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Monkey D. Luffy"
          className="input"
        />

        <div className="difficulty-group">
          <span className="label">Dificuldade</span>
          <div className="buttons">
            {["easy", "medium", "hard"].map((key) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`difficulty-btn ${difficulty === key ? "active" : ""}`}
              >
                {key === "easy" ? "Fácil" : key === "medium" ? "Médio" : "Difícil"}
              </button>
            ))}
          </div>
        </div>

        <button onClick={startGame} className="start-btn">Iniciar Jogo</button>
      </div>

      <footer className="footer">
        <p>© 2025 Desenvolvido por Dilmario</p>
        <p>Inspirado em One Piece. Projeto sem fins comerciais.</p>
      </footer>
    </>
  );
}

export default Home;