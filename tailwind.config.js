/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'lime-green': '#F0FF7E',
        'lime-green-dark': '#ecff5bff',
        'light-grey': '#18181A', 
        'lightiest-grey': '#888888',
        'enhance-black': '#101010',
        'medium-grey': '#C3C3C31F',
        'light-blue': '#BDC8FF',
      },
      fontFamily: {
        'sans': ['SpaceGrotesk_400Regular'],
        'space-grotesk': ['SpaceGrotesk_400Regular'],
        'space-grotesk-light': ['SpaceGrotesk_300Light'],
        'space-grotesk-medium': ['SpaceGrotesk_500Medium'],
        'space-grotesk-semibold': ['SpaceGrotesk_600SemiBold'],
        'space-grotesk-bold': ['SpaceGrotesk_700Bold'],
      }
    },
  },
  plugins: [],
};
