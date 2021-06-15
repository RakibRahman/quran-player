module.exports = {
  purge: {
    enabled: true,
    content: ["./**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      quickSand: ["Quicksand", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
