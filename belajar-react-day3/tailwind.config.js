// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        backgroundDark: '#242424',
        textLight: 'rgba(255, 255, 255, 0.87)',
        link: '#646cff',
        linkHover: '#535bf2',
        light: '#ffffff',
        buttonBg: '#1a1a1a',
        buttonHover: '#646cff',
      },
    },
  },
  plugins: [],
}
