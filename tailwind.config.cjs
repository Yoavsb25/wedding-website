/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7fa',
          100: '#e8ecf2',
          200: '#d1dae6',
          300: '#a8b8d0',
          400: '#7a8fb5',
          500: '#5a6f94',
          600: '#455a7a',
          700: '#364661',
          800: '#263248',
          900: '#1a2332',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      transitionDuration: {
        motion: '300ms',
      },
      transitionTimingFunction: {
        weddingRing: 'cubic-bezier(0.33, 0, 0.2, 0.99)',
        petal: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
