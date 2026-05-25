/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        paper: "#F8F4E9",
        gold: "#D4AF37",
        rose: "#C0392B"
      },

      fontFamily: {
        title: [
          "Cormorant Garamond",
          "serif"
        ],

        letter: [
          "Special Elite",
          "Courier Prime",
          "monospace"
        ],

        signature: [
          "Great Vibes",
          "cursive"
        ]
      },

      boxShadow: {
        paper:
          "0 20px 80px rgba(0,0,0,.35)",

        glow:
          "0 0 60px rgba(212,175,55,.35)",

        romantic:
          "0 0 120px rgba(255,255,255,.08)"
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform:
              "translateY(0px)"
          },

          "50%": {
            transform:
              "translateY(-12px)"
          }
        },

        glow: {
          "0%,100%": {
            opacity: "0.4"
          },

          "50%": {
            opacity: "1"
          }
        },

        petal: {
          "0%": {
            transform:
              "translateY(-50px) rotate(0deg)"
          },

          "100%": {
            transform:
              "translateY(110vh) rotate(360deg)"
          }
        }
      },

      animation: {
        float:
          "float 4s ease-in-out infinite",

        glow:
          "glow 3s ease-in-out infinite",

        petal:
          "petal 10s linear infinite"
      }
    }
  },

  plugins: []
};