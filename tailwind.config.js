/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        spinnerDelay: {
          '0%, 40%, 100%': { transform: 'scaleY(0.4)' },
          '20%': { transform: 'scaleY(1.0)' },
        },
      },
      animation: {
        spinnerDelay: 'spinnerDelay 1.2s infinite ease-in-out',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)',
      },
      colors: {
        "black-40":"rgb(0 0 0 / 40%)"
      }
    },
  },
  plugins: [],
}

