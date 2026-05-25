import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Howl } from "howler";

interface Props {
  onComplete: () => void;
}

const LETTER_TEXT = `sayangku cintaku emaa,

Aku ingin meminta maaf atas kata-kataku yang telah menyakitimu. Aku sadar apa yang kuucapkan membuatmu kecewa dan terluka, dan aku benar-benar menyesal karena hal itu.

Tidak ada alasan yang bisa membenarkan kesalahanku. Aku hanya ingin kamu tahu bahwa aku tidak pernah berniat menyakitimu. Aku akan belajar untuk lebih menjaga ucapan dan lebih menghargai perasaanmu ke depannya.

Aku sangat bersyukur memilikimu, dan sudah menjadi bagian penting dalam hidupmu. Aku berharap masih diberi kesempatan untuk memperbaiki kesalahan ini dan menjadi pribadi yang lebih baik untukmu.`;

const FOOTER_TEXT = `\n\nTo,\n\nWirangga\n\nyang selalu berharap bisa memperbaiki semuanya.`;

const FULL_TEXT = LETTER_TEXT + FOOTER_TEXT;

export default function EnvelopeScene({ onComplete }: Props) {
  const [opened, setOpened] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [forgivenMsg, setForgivenMsg] = useState(false);

  // Audio ref
  const typeSound = useRef<Howl | null>(null);

  // DOM element refs
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const sealLeftRef = useRef<HTMLDivElement>(null);
  const sealRightRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Typewriter state
  const [displayedText, setDisplayedText] = useState("");
  const textIndex = useRef(0);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Howler init ────────────────────────────────────────────────────────────
  useEffect(() => {
    typeSound.current = new Howl({
      src: ["/audio/typewriter-key.wav"],
      volume: 0.15,
    });
    return () => { typeSound.current?.unload(); };
  }, []);

  // ─── Auto-scroll: cursor always in view ────────────────────────────────────
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [displayedText]);

  // ─── Envelope open handler ──────────────────────────────────────────────────
  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    window.dispatchEvent(new CustomEvent("play-romantic-music"));

    const tl = gsap.timeline({
      onComplete: () => setTypingStarted(true),
    });

    // 1. Split wax seal
    tl.to(sealLeftRef.current, {
      x: -40, y: -10, rotation: -30, opacity: 0,
      duration: 0.8, ease: "power2.out",
    })
      .to(sealRightRef.current, {
        x: 40, y: -10, rotation: 30, opacity: 0,
        duration: 0.8, ease: "power2.out",
      }, "-=0.8");

    // 2. Open top flap
    tl.to(flapRef.current, {
      rotateX: -180, duration: 1.2, ease: "power2.inOut",
    }, "-=0.2");
    tl.set(flapRef.current, { zIndex: 1 });

    // 3. Warm inner glow
    tl.to(innerGlowRef.current, {
      opacity: 0.8, scale: 1.5, duration: 1.0, ease: "power2.out",
    }, "-=0.8");

    // 4. Slide paper out slightly
    tl.to(paperRef.current, {
      y: -230, scale: 0.52, rotation: -4,
      duration: 1.4, ease: "power2.out",
    }, "-=0.4");
    tl.set(paperRef.current, { zIndex: 100 });

    // 5. Expand paper to viewport center — tall enough for full content
    tl.to(paperRef.current, {
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      width: "min(90vw, 375px)",
      height: "min(88vh, 380px)",
      duration: 1.6,
      ease: "back.out(0.6)",
    });
  };

  // ─── Typewriter core ────────────────────────────────────────────────────────
  const startTyping = useCallback(() => {
    textIndex.current = 0;
    setDisplayedText("");

    const type = () => {
      if (textIndex.current >= FULL_TEXT.length) {
        setTypingComplete(true);
        return;
      }
      const ch = FULL_TEXT[textIndex.current];
      setDisplayedText(prev => prev + ch);
      textIndex.current += 1;

      if (typeSound.current && ch !== " " && ch !== "\n") {
        typeSound.current.rate(0.88 + Math.random() * 0.24);
        typeSound.current.volume(0.10 + Math.random() * 0.10);
        typeSound.current.play();
      }

      let delay = 80 + Math.random() * 120;
      if (ch === "." || ch === "," || ch === "?")
        delay = 800;
      else if (ch === "\n")
        delay = 1200;

      typingTimer.current = setTimeout(type, delay);
    };

    type();
  }, []);

  useEffect(() => {
    if (!typingStarted) return;
    startTyping();
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, [typingStarted, startTyping]);

  // ─── Replay handler ─────────────────────────────────────────────────────────
  const handleReplay = () => {
    setTypingComplete(false);
    setForgiven(false);
    setForgivenMsg(false);
    startTyping();
  };

  // ─── Forgiven handler ───────────────────────────────────────────────────────
  const handleForgiven = () => {
    setForgiven(true);
    setTimeout(() => setForgivenMsg(true), 400);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-slate-950">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black pointer-events-none" />

      {/* Floating particles */}
      {Array.from({ length: 45 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-100/20 blur-[1px] pointer-events-none"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: Math.random() * 5 + 4, ease: "easeInOut" }}
        />
      ))}

      {/* Title (visible before open) */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="absolute top-16 text-center select-none z-20"
          >
            <h1 className="text-white text-5xl md:text-6xl font-title tracking-wider glow-soft">
              letterlove
            </h1>
            <p className="text-gray-400 mt-3 text-sm tracking-widest font-light">
              SEPUCUK SURAT UNTUK EMA
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3-D Envelope ──────────────────────────────────────── */}
      <div className="perspective-wrapper relative flex items-center justify-center z-10 w-full h-full pointer-events-none">
        <motion.div
          ref={envelopeRef}
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={!opened ? { y: -8, scale: 1.02 } : {}}
          className={`envelope-container select-none pointer-events-auto ${!opened ? "cursor-pointer" : "cursor-default"}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Back */}
          <div className="envelope-face envelope-back" />

          {/* Inner warm glow */}
          <div
            ref={innerGlowRef}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-400/40 blur-3xl opacity-0 rounded-full pointer-events-none"
          />

          {/* ── Paper Sheet ──────────────────────────────────── */}
          <div
            ref={paperRef}
            className="envelope-paper-sheet"
            style={{
              width: "380px",
              height: "250px",
              left: "20px",
              bottom: "12px",
              transformStyle: "preserve-3d",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Fold crease lines */}
            <div className="paper-crease-horizontal" style={{ top: "33%" }} />
            <div className="paper-crease-horizontal" style={{ top: "66%" }} />
            <div className="paper-crease-vertical" style={{ left: "50%" }} />
            <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

            {/* ── Letter scroll area ── */}
            <div
              ref={scrollContainerRef}
              className="relative w-full h-full select-text text-gray-900 overflow-y-auto letter-scroll-area"
              style={{
                paddingTop: "80px",
                paddingLeft: "60px",
                paddingRight: "60px",
                paddingBottom: "60px",
              }}
            >
              {/* Warm top-light overlay */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />

              {/* Main typed text */}
              <p className="font-letter text-sm leading-relaxed whitespace-pre-wrap relative z-0">
                {displayedText}
                {/* Blinking cursor — auto-scroll target */}
                {typingStarted && !typingComplete && (
                  <span
                    ref={cursorRef}
                    className="inline-block w-[2px] h-[1.1em] bg-gray-800 ml-[1px] align-middle cursor-blink"
                    aria-hidden="true"
                  />
                )}
              </p>

              {/* ── Action buttons (after typing complete) ── */}
              <AnimatePresence>
                {typingComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
                  >
                    {/* Forgiven button */}
                    <button
                      onClick={handleForgiven}
                      disabled={forgiven}
                      className="
                        px-6 py-2.5 rounded-full text-sm font-letter tracking-wide
                        bg-rose-500 hover:bg-rose-600 active:scale-95
                        text-black
                        shadow-[0_0_20px_rgba(244,63,94,0.35)]
                        hover:shadow-[0_0_32px_rgba(244,63,94,0.55)]
                        hover:scale-105 transition-all duration-300
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                      "
                    >
                      ❤️ Maafkan Aku
                    </button>

                    {/* Replay button */}
                    <button
                      onClick={handleReplay}
                      className="
                        px-6 py-2.5 rounded-full text-sm font-letter tracking-wide
                        bg-[#f8f0dc] hover:bg-[#f0e6c8] active:scale-95
                        text-gray-800 border border-[#c9a84c]/50
                        hover:shadow-[0_0_24px_rgba(201,168,76,0.35)]
                        hover:scale-105 transition-all duration-300
                      "
                    >
                      💌 Baca Surat Lagi
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgiven message */}
              <AnimatePresence>
                {forgivenMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="mt-6 text-center font-letter text-sm text-rose-600 tracking-wide"
                  >
                    Terima kasih karena masih memberiku kesempatan ❤️
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Side & bottom flaps */}
          <div className="envelope-face envelope-flap-left" />
          <div className="envelope-face envelope-flap-right" />
          <div className="envelope-face envelope-flap-bottom" />

          {/* Top flap */}
          <div ref={flapRef} className="envelope-flap-top" />

          {/* Wax seal */}
          <div className="wax-seal">
            <div ref={sealLeftRef} className="seal-half seal-left w-1/2 h-full absolute left-0 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-[50px] h-[50px] absolute left-0">
                <path d="M 50 30 C 50 30, 70 10, 90 30 C 110 50, 70 80, 50 90 C 30 80, -10 50, 10 30 C 30 10, 50 30, 50 30 Z" fill="#b91c1c" />
              </svg>
            </div>
            <div ref={sealRightRef} className="seal-half seal-right w-1/2 h-full absolute right-0 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-[50px] h-[50px] absolute right-[-25px]">
                <path d="M 50 30 C 50 30, 70 10, 90 30 C 110 50, 70 80, 50 90 C 30 80, -10 50, 10 30 C 30 10, 50 30, 50 30 Z" fill="#b91c1c" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Click hint */}
      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-16 text-gray-400 text-sm tracking-widest pointer-events-none z-20"
        >
          ❤️ Sentuh amplop untuk membuka surat ❤️
        </motion.p>
      )}
    </section>
  );
}