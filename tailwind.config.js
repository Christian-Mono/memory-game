/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        matched: {
          "0%, 100%": { transform: "scale(1)"},
          "50%": { transform: "scale(1.25)", padding:'0.3rem' },
        },
      },
    },
  },
  plugins: [],
};
