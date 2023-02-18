/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'my-black': '#343541',
        'my-black-dark': '#202123',
        'my-black-light': 'hsla(0, 0%, 100%, .05)',
        'my-green': '#11A37F',
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
    },
  },
  plugins: [],
}
