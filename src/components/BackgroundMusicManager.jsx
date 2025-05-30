import { useEffect, useRef } from "react";

function BackgroundMusicManager({ src, play }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
    }

    if (play) {
      audioRef.current.src = src;
      audioRef.current.play().catch((e) =>
        console.error("Erro ao tocar música:", e)
      );
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [src, play]);

  return null;
}

export default BackgroundMusicManager;
