import { useEffect, useRef, useState } from "react";

function BackgroundMusicManager({ src, play }) {
  const audioRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  // Cria e limpa o áudio
  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;

    const handleUserInteraction = () => {
      setCanPlay(true);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      // Quando sai da página, para e limpa o áudio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [src]);

  // Toca ou pausa com base no estado
  useEffect(() => {
    if (!audioRef.current || !canPlay) return;

    if (play) {
      audioRef.current.play().catch((err) =>
        console.warn("Erro ao tocar música:", err)
      );
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [play, canPlay]);

  return null;
}

export default BackgroundMusicManager;

