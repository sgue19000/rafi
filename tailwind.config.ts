import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#12141a", paper: "#f6f4ef", line: "#e4dfd4", accent: "#2b5e4a", warn: "#8a4b12", danger: "#8b2e2e" },
      fontFamily: { sans: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"], serif: ["ui-serif", "Georgia", "serif"] }
    }
  },
  plugins: []
};
export default config;
