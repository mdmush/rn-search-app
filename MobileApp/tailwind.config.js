// tailwind.config.js
module.exports = {
  content: [
    "./src/screens/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./App.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0,0,0,0.5)'
      }
    }
  }
  // ...
};