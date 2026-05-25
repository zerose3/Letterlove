import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function EndingScene() {
  const [forgiven, setForgiven] = useState(false);

  // Stable particles — generated once
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 4,
      drift: (Math.random() - 0.5) * 14,
    })), []
  );

  // Confetti pieces — generated once when forgiven
  const confetti = useMemo<Particle[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      size: 0,
      duration: Math.random() * 2.5 + 1.5,
      delay: Math.random() * 0.6,
      drift: 0,
    })), []
  );

  const EMOJIS = ["❤️", "💖", "💗", "✨", "🌸", "💌"];

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0e1628] to-black" />

      {/* Soft radial warm glow center */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(ellipse, rgba(190,57,43,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Floating particles ── */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-yellow-100/30 pointer-events-none"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ opacity: [0.05, 0.5, 0.05], y: [0, -35, 0], x: [0, p.drift, 0] }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Confetti burst on forgiven ── */}
      <AnimatePresence>
        {forgiven && confetti.map(p => (
          <motion.div
            key={p.id}
            className="absolute text-xl pointer-events-none z-50"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: [0, 1.4, 1],
              x: (Math.random() - 0.5) * 320,
              y: (Math.random() - 0.5) * 320,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          >
            {EMOJIS[p.id % EMOJIS.length]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Main content card ── */}
      <div className="relative z-20 w-full max-w-2xl px-6 text-center flex flex-col items-center gap-0">

        {/* Thin gold divider top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-24 h-px mb-10"
          style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }}
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-title text-white text-5xl md:text-6xl leading-tight tracking-wide"
          style={{ textShadow: "0 0 60px rgba(212,175,55,0.2)" }}
        >
          Terima Kasih,&nbsp;Ema
        </motion.h1>

        {/* Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "backOut" }}
          className="mt-5 text-3xl"
          style={{ filter: "drop-shadow(0 0 12px rgba(190,18,60,0.6))" }}
        >
          ❤️
        </motion.div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-gray-300 font-title text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
        >
          Terima kasih sudah membaca surat ini sampai akhir. Semoga setiap kata
          yang tertulis tersampaikan langsung ke hatimu.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-4 text-gray-500 font-letter text-sm leading-relaxed tracking-wide"
        >
          Aku tidak tahu apakah kata-kata ini cukup — tapi aku berharap kamu tahu,
          semua ini ditulis dengan tulus.
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
          className="w-32 h-px mt-10"
          style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }}
        />

        {/* ── Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary — forgiven */}
          <button
            onClick={() => setForgiven(true)}
            disabled={forgiven}
            className="group relative px-8 py-3.5 rounded-full font-letter text-sm tracking-widest text-white transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #be123c, #e11d48)",
              boxShadow: forgiven
                ? "0 0 40px rgba(190,18,60,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 0 24px rgba(190,18,60,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={e => {
              if (!forgiven) (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 44px rgba(190,18,60,0.65), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                forgiven
                  ? "0 0 40px rgba(190,18,60,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 0 24px rgba(190,18,60,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
            }}
          >
            {forgiven ? "✓ Sudah Kumaafkan" : "❤️ Maafkan Aku"}
          </button>

          {/* Secondary — replay */}
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3.5 rounded-full font-letter text-sm tracking-widest transition-all duration-300 active:scale-95"
            style={{
              background: "rgba(248, 240, 220, 0.06)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#e8d8a8",
              boxShadow: "0 0 0 rgba(212,175,55,0)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 28px rgba(212,175,55,0.2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.6)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,240,220,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 rgba(212,175,55,0)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.3)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,240,220,0.06)";
            }}
          >
            💌 Baca Surat Lagi
          </button>
        </motion.div>

        {/* ── Forgiven message ── */}
        <AnimatePresence>
          {forgiven && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-8 px-6 py-4 rounded-2xl"
              style={{
                background: "rgba(190,18,60,0.08)",
                border: "1px solid rgba(190,18,60,0.2)",
                boxShadow: "0 0 32px rgba(190,18,60,0.12)",
              }}
            >
              <p className="font-title text-rose-300 text-xl md:text-2xl">
                Terima kasih karena masih memberiku kesempatan ❤️
              </p>
              <p className="font-letter text-rose-400/70 text-xs mt-2 tracking-widest">
                — Wirangga
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thin gold divider bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.8, ease: "easeOut" }}
          className="w-24 h-px mt-12"
          style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }}
        />
      </div>
    </section>
  );
}