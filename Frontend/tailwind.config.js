import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Ensures Tailwind scans the correct files
  theme: {
    extend: {
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

  // Safelist certain classes to prevent them from being purged
  safelist: [
    'bg-green-400',
    'text-green-400',
    'bg-yellow-400',
    'text-yellow-400',
    'bg-red-400',
    'text-red-400',
    'bg-blue-400',
    'text-blue-400',
    'bg-purple-400',
    'text-purple-400',
    'bg-orange-400',
    'text-orange-400',
    'bg-slate-400',
    'text-slate-400',
    'bg-gray-300',
    'text-gray-300',
  ],

  // Ensure that important is set to make sure TailwindCSS has priority over other styles
  important: true,

  // Purging unused CSS for production builds
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        'bg-green-400',
        'text-green-400',
        'bg-yellow-400',
        'text-yellow-400',
        'bg-red-400',
        'text-red-400',
        'bg-blue-400',
        'text-blue-400',
        'bg-purple-400',
        'text-purple-400',
        'bg-orange-400',
        'text-orange-400',
        'bg-slate-400',
        'text-slate-400',
        'bg-gray-300',
        'text-gray-300',
      ],
    },
  },
};
