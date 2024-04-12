// tailwind.config.js

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // Definición de la paleta de colores
        primary: '#074173',
        secondary: '#1679AB',
        tertiary: '#5DEBD7',
        accent: '#C5FF95',
      },
      fontFamily: {
        // Puedes agregar tus fuentes personalizadas aquí
        // Por ejemplo:
        // 'custom-font': ['Open Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
