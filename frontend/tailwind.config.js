/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "mobile-m": "330px",
      "mobile-l": "380px",
      "mobile-tablet": "440px",
      "tablet": "630px",
      "laptop-sm": "770px",
      "laptop-l": "1030px",
      "4k": "1800px",
    },
    extend: {
      height: {
        screen: "100svh",
      },
      colors: {
        primaryBackground: "#312E2B",
        secondaryBackground: "#2B2B2B",
        rgbaBackground: "rgba(0, 0, 0, 0.2)",
        rgba2Background: "rgba(0, 0, 0, 0.3)",
        lightSquare: "#E4E4C3",
        darkSquare: "#779556",
        primaryButtonBackground: "#81B64C",
        primaryButtonBackgroundHover: "#5d9948",
        secondaryButtonBackground: "#FFFFFF1A",
        secondaryButtonBackgroundHover: "rgba(0, 0, 0, .4)",
      },
    },
  },
  plugins: [],
};
