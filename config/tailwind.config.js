const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class', // toggle via .dark on <html>
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
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        body: 'var(--color-body)',
        textprimary: 'var(--color-textprimary)',
        textaccent: 'var(--color-textaccent)',
      },
      keyframes: {
        floatSoft: {
          '0%, 100%': {
            transform: 'translate(0px, 0px)',
          },
          '50%': {
            transform: 'translate(var(--x), var(--y))',
          },
        },
      },
      animation: {
        floatSoft: 'floatSoft var(--duration) ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
