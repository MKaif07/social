/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "var(--primary-light)",
          secondary: "var(--secondary-light)",
          tertiary: "var(--tertiary-light)",
          contrasting: "var(--contrasting-light)",
        },
        dark: {
          primary: "var(--dark-primary-dark)",
          secondary: "var(--dark-secondary-dark)",
          tertiary: "var(--dark-tertiary-dark)",
          contrasting: "var(--dark-contrasting-dark)",
        },
        boxShadow: {
          light: "0 4px 8px var(--contrasting-light)",
          dark: "0 4px 8px var(--dark-contrasting-dark)",
        },
      },
    },
  },
  plugins: [],
};
// change in tailwind config
