/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 20px rgba(23, 37, 84, 0.12)",
        card: "0 8px 30px rgba(23, 37, 84, 0.10)",
      },

      borderRadius: {
        crochet: "1rem",
      },
    },
  },

  plugins: [],
};
