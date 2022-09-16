module.exports = {

  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp')

  ],

}
