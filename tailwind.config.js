/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line is the key. It enables class-based dark mode.
  darkMode: 'class',
  
  // This tells Tailwind to scan your source files for classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {},
  },
  
  plugins: [],
}