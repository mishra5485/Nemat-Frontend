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
        bg_green: "#60713a",
        text_Color2:"60713A",
        text_Color: "#642F29",
        Cream: "#FEEEE2",
        LightCream: "#FFFBF0",
      },
      screens: {
        mobile: "220px",
      },
      borderRadius: {
        iFull: "9999px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".custom-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".custom-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};


