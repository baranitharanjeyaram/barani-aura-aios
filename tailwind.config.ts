import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deepnavy: "#0A2540",
        midnight: "#102A43",
        steelblue: "#486581",
        silvergray: "#9FB3C8",
        warmwhite: "#F4F1EC",
        gold: {
          DEFAULT: "#C9A227",
          light: "#E5C158",
          dark: "#9E7D1A",
        },
        risk: {
          low: "#2E7D32",
          medium: "#F9A825",
          high: "#C62828",
          critical: "#8E0000",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A227 0%, #E5C158 50%, #9E7D1A 100%)",
        "navy-gradient": "linear-gradient(180deg, #102A43 0%, #0A2540 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 15px rgba(201, 162, 39, 0.3)",
        "premium-shadow": "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        "card-shadow": "0 4px 20px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
export default config;
