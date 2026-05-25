import { useState } from "react";
import EnvelopeScene from "./components/EnvelopeScene";
import EndingScene from "./components/EndingScene";
import AudioController from "./components/AudioController";

type Scene = "envelope" | "ending";

export default function App() {
  const [scene, setScene] = useState<Scene>("envelope");

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white select-none">
      {/* Active Scene */}
      {scene === "envelope" ? (
        <EnvelopeScene onComplete={() => setScene("ending")} />
      ) : (
        <EndingScene />
      )}

      {/* Global Audio Controller overlay */}
      <AudioController />
    </div>
  );
}