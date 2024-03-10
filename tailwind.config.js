/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'palette': '#3b234a',
        'palette2': '#814CA1',
        'palette3': '#23152C',
        'palette4': '#c3bbc9'
      },
      colors:{
        'palette': '#c3bbc9'
      }
    },
  },
  plugins: [],
}

