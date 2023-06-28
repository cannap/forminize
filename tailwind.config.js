/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 50%, 98%)',
        primary: {
          DEFAULT: 'hsl(228, 83%, 59%)',
          foreground: 'hsl(0, 0%, 100%)'
        },
        danger: {
          DEFAULT: 'hsl(0, 100%, 66%)',
          secondary: 'hsl(0, 51%, 46%)',
          foreground: 'hsl(0, 0%, 100%)'
        }
      }
    }
  },
  plugins: []
};
