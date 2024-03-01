/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        SliderBg: "#EFEFEF",
        bg_green: "#60713a",
        text_Color2: "#60713A",
        text_Color: "#642F29",
        Cream: "#FEEEE2",
        LightCream: "#FFFBF0",
        CartRightColor: "#F6F5F0",
      },
    },
  },
  plugins: [],
};
