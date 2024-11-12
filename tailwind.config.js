/** @type {import('tailwindcss').Config} */
import daisyuiThemes from 'daisyui/src/theming/themes';

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes["light"],
          'primary': '#2667ff',
          'primary-content': "white",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundColor: {
        custom: "#f6f6f6"
      },
      height: {
        custom: 'calc(100vh - 69px - 40px)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {}
    }
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require("tailwindcss-animate")
  ],
}