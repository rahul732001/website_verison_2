/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        gold: '#d4af37',
        'gold-dark': '#bf9b30',
        'light-gold': '#f8f3e6',
        cream: '#f9f7f2',
        'deep-brown': '#3c2f2f',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};