import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const bgMusic = useRef<Howl | null>(null);

  useEffect(() => {
    bgMusic.current = new Howl({
      src: ["/audio/komang.mp3"],
      loop: true,
      volume: volume,
      html5: true
    });

    return () => {
      bgMusic.current?.stop();
      bgMusic.current?.unload();
    };
  }, []);

  useEffect(() => {
    bgMusic.current?.volume(volume);
  }, [volume]);

  useEffect(() => {
    bgMusic.current?.mute(isMuted);
  }, [isMuted]);

  useEffect(() => {
    const startMusic = () => {
      if (!bgMusic.current) return;
      if (bgMusic.current.playing()) return;
      bgMusic.current.play();
      bgMusic.current.fade(0, volume, 2500);
      setIsPlaying(true);
    };

    window.addEventListener("play-romantic-music", startMusic);
    return () => {
      window.removeEventListener("play-romantic-music", startMusic);
    };
  }, [volume]);

  const handlePlay = () => {
    if (!bgMusic.current) return;
    if (bgMusic.current.playing()) return;

    bgMusic.current.play();
    bgMusic.current.fade(0, volume, 1500);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!bgMusic.current) return;

    bgMusic.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        fixed
        md:bottom-6 md:right-6
        top-4 right-4
        z-[9999]
      "
    >
      <div
        className="
          backdrop-blur-xl
          bg-black/30
          border
          border-white/10
          rounded-2xl
          p-3 md:p-4
          shadow-2xl
          w-[220px] md:w-[260px]
        "
      >
        <h3
          className="
            text-white
            text-xs md:text-sm
            mb-2 md:mb-3
            font-semibold
          "
        >
          KOMANG - RAIM LAODE
        </h3>

        <div className="flex gap-2 mb-2 md:mb-3">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="
                flex-1
                bg-rose-500
                hover:bg-rose-600
                text-white
                py-1.5 md:py-2
                rounded-lg
                transition
                text-sm
              "
            >
              ▶ Play
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="
                flex-1
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                py-1.5 md:py-2
                rounded-lg
                transition
                text-sm
              "
            >
              ⏸ Pause
            </button>
          )}

          <button
            onClick={toggleMute}
            className="
              px-3 md:px-4
              bg-slate-700
              hover:bg-slate-600
              rounded-lg
              text-white
              transition
            "
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>

        <div>
          <label
            className="
              text-[10px] md:text-xs
              text-gray-300
              block
              mb-1 md:mb-2
            "
          >
            Volume
          </label>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) =>
              setVolume(Number(e.target.value))
            }
            className="w-full cursor-pointer"
          />
        </div>

        <p
          className="
            text-[10px] md:text-[11px]
            text-gray-400
            mt-2 md:mt-3
          "
        >
          Musik untuk menemani surat ini
        </p>
      </div>
    </motion.div>
  );
}
