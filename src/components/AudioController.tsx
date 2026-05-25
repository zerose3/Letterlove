import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]"
    >
      {/* Minimal title bar */}
      <div
        onClick={() => setShowControls(!showControls)}
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-full
          backdrop-blur-md
          bg-white/5
          border border-white/10
          cursor-pointer
          hover:bg-white/10
          transition-all duration-300
          select-none
        "
      >
        {/* Music icon / play status */}
        <span className="text-xs">
          {isPlaying ? "🎵" : "🎶"}
        </span>

        {/* Song title */}
        <span className="text-white text-xs font-light tracking-widest uppercase">
          komang - raim laode
        </span>

        {/* Expand indicator */}
        <span className="text-white/40 text-[10px] ml-1">
          {showControls ? "▲" : "▼"}
        </span>
      </div>

      {/* Expandable controls */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-2
            p-3
            rounded-xl
            backdrop-blur-xl
            bg-black/40
            border border-white/10
            w-[200px]
            mx-auto
          "
        >
          <div className="flex gap-2 mb-2">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="
                  flex-1 bg-rose-500 hover:bg-rose-600
                  text-white py-1.5 rounded-lg
                  text-xs transition
                "
              >
                ▶ Play
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="
                  flex-1 bg-yellow-500 hover:bg-yellow-600
                  text-white py-1.5 rounded-lg
                  text-xs transition
                "
              >
                ⏸ Pause
              </button>
            )}

            <button
              onClick={toggleMute}
              className="
                px-3 bg-slate-700 hover:bg-slate-600
                rounded-lg text-white text-xs transition
              "
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>

          <div>
            <label className="text-[10px] text-gray-400 block mb-1">
              Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
