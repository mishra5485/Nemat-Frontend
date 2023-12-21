/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roxborough: ["Roxborough  CF Thin"],
        Marcellus: ["Marcellus"],
        Abel: ["Abel, sans-serif"],
      },
      colors: {
        bg_green: "#60713A",
        text_Color: "#642F29",
      },
      screens: {
        mobile: "220px",
      },
    },
  },
  plugins: [],
};


