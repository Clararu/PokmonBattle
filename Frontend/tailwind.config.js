/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'], // Ensure it scans all relevant files
  theme: {
    extend: {
      colors: {
        hp: '#22c55e !important', // Green for HP
        speed: '#eab308', // Yellow for Speed
        attack: '#f87171', // Red for Attack
        defense: '#3b82f6', // Blue for Defense
        's-atk': '#f97316', // Orange for Special Attack
        's-def': '#a855f7', // Purple for Special Defense
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
      scale: {
        40: '0.4',
        50: '.5',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [daisyui],

  // purge: {
  //   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'], // Make sure all relevant files are included
  //   options: {
  //     safelist: ['text-hp', 'text-speed', 'text-attack', 'text-defense', 'text-s-atk', 'text-s-def'], // Prevent purging of your custom text classes
  //   },
  // },
};
