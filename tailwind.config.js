/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roxborough: ["Roxborough  CF Thin"],
        Marcellus: ["Marcellus"],
      },
      colors: {
        bg_green: "#60713A",
        text_Color: "#642F29",
      },
    },
  },
  plugins: [],
};


