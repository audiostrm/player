/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: '#64748b',
        'dark-slate': '#1e293b',
        blue: '#3b82f6',
        love: '#d8b3fe',
      },
    },
  },
  plugins: [],
};
