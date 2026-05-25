import { useState } from "react";
import EnvelopeScene from "./components/EnvelopeScene";
import AudioController from "./components/AudioController";

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white select-none">
      {/* Envelope Scene — main & only scene */}
      <EnvelopeScene onComplete={() => { }} />

      {/* Global Audio Controller overlay */}
      <AudioController />
    </div>
  );
}