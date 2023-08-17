// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ["Barriecito", "cursive"],
        "dancing-script": ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
