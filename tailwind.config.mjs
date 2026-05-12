/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        surface: "#080808",
        glass: "rgba(0, 0, 0, 0.72)",
        neon: {
          purple: "#fb923c",
          pink: "#fb923c",
          blue: "#fb923c",
          orange: "#fb923c",
          red: "#fb923c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow": "none",
        "seigaiha": "none",
      },
      boxShadow: {
        neon: "0 0 32px rgba(251, 146, 60, 0.28)",
        card: "0 25px 50px -12px rgba(0, 0, 0, 0.65)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
