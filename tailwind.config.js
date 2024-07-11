/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#023047",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
