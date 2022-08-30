/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logoColor: "rgb(47, 74, 228)",
        blue: "rgb(55, 112, 255)",
        textcolor: "rgb(97, 107, 112)",
        darkBlue: "rgb(57, 54, 171)",
        lightBlue: "rgb(235, 238, 255)",
        border: "rgb(224, 224, 224)",
        black: "rgb(39, 51, 57)",
        red: "rgb(255, 47, 0)",
        yellow: "rgb(252, 185, 0)",
        purple: "rgb(153, 0, 239)",
        green: "rgb(1, 231, 122)",
        lightGreen: "rgba(228, 244, 240, 0.5)",
        whiteColor: "#f5f7f7",
      },
    },
  },
  plugins: [],
};
