/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F97316", // lively coral-orange
          light: "#FB923C",
          dark: "#EA580C",
        },
        background: {
          DEFAULT: "#FAFAF9", // light stone
          light: "#FFFFFF",
          lighter: "#F5F5F4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          light: "#FAFAF9",
          lighter: "#F5F5F4",
        },
        text: {
          primary: "#1C1917",
          secondary: "#57534E",
          tertiary: "#78716C",
        },
        accent: {
          DEFAULT: "#F97316",
          red: "#F43F5E",
          yellow: "#FBBF24",
        },
      },
    },
  },
  plugins: [],
};
