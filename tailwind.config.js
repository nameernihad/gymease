// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        barriecito: ["Barriecito", "cursive"],
        "dancing-script": ["Dancing Script", "cursive"],
      },
      placeholder: {
        "gray-400": {
          color: "#ccc", // Placeholder text color
          padding: "8px", // Adjust padding as needed
        },
      },
    },
  },
  plugins: [],
};
