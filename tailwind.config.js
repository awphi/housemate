module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#538774",
        secondary: "#64696a",
        main: "#323738",
        background: "#282c2d",
        header: "#f2f7f7",
        accent: "#83A7E6",
        accent2: "#A7E683",
        border: "#313636",
      },
    },
  },
};
