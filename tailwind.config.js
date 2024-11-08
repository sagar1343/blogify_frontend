/** @type {import('tailwindcss').Config} */
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
          ...require("daisyui/src/theming/themes")["light"],
          'primary': '#2667ff',
          'primary-content': "white",
        },
      },
    ],
  },
  theme: {
    extend: {
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

