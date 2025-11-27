const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#4C7CF3",   // main blue
          50:  "#EBF1FF",
          100: "#D6E3FF",
          200: "#ADC7FF",
          300: "#85ABFF",
          400: "#5C8FFF",
          500: "#4C7CF3",
          600: "#2856C8",
          700: "#1E4098",
          800: "#152B68",
          900: "#0B1638",
        },
        secondary: {
          DEFAULT: "#0F172A",  // dark navy used in the screenshot
        },
        accent: {
          DEFAULT: "#89A6FB",  // softer blue accent
        },
        body: {
          DEFAULT: "#CBD5E1"   // muted light text
        }
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/container-queries'),
  ]
}
