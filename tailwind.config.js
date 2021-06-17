module.exports = {
  purge: {
    enabled: true,
    content: ["./**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "28rem",
      },
    },
    fontFamily: {
      quickSand: ["Quicksand", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
