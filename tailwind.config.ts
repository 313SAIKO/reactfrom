import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
