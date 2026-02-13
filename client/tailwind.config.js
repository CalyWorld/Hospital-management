/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      purple: "#701a75",
      white: "#f8fafc",
      darkBlue: "#1e293b",
      darkGray: "#4b5563",
      gray: "#d4d4d8",
    },
  },
  plugins: [],
};
