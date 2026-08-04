import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#05070B",
        panel: "#10151C",
        accent: "#95BF47",
        muted: "#94A3B8",
        line: "#1F2937"
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(149, 191, 71, 0.18)",
        premium: "0 24px 90px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at center, rgba(149,191,71,0.16), transparent 34rem)"
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        orbit: "orbit 22s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
