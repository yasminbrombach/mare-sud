/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FCFAF6",
        sand: "#E4D6BE",
        navy: "#16283F",
        green: "#1F3D2E",
        gold: "#B8924A",
        goldLight: "#D6B876",
      },
    },
  },
  plugins: [],
};
