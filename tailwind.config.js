/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#174655',
        secondary: '#009688',
        background: '#f5f5f5',
      }
    },
  },
  plugins: [],
}
