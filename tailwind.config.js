/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white': '#ffffff', // Set background color to white
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}