import { Font } from "@react-pdf/renderer";
import createTw from "react-pdf-tailwind";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v2/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZFhjQ.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v2/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZFhjQ.ttf",
      fontWeight: 600,
    },
  ],
});
export const stylesPDF = {
  boldHead: {
    fontFamily: "Inter",
    fontWeight: 600,
    paddingTop: 5,
    fontSize: 12,
  },
};
const SPACING = {
  DEFAULT: "1.5rem", // redundant?
  0.5: "0.125rem", // XTiny
  1: "0.25rem", // Tiny
  2: "0.5rem", // XXSmall
  3: "0.75rem", // XSmall
  4: "1rem", // Small
  6: "1.5rem", // Regular
  8: "2rem", // Medium
  12: "3rem", // Large
  16: "4rem", // XLarge
  20: "5rem", // XXLarge
  24: "6rem", // Huge
  32: "8rem", // XHuge
  48: "12rem", // XXHuge
};
//kan kjøre tailwind styling
export const tw = createTw({
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1rem"],
      rg: ["1rem", "1.5rem"],
      md: ["1.25rem", "1.75rem"],
      lg: ["1.5rem", "2rem"],
      "font-sm": "1rem",
      "font-md": "1.5rem",
      "font-lg": "2rem",
      lglogo: ["3rem", "2rem"],
      h2: 30,
    },
    fontFamily: {
      sans: ["Open Sans"],
      inter: ["Inter"],
    },
    extend: {
      height: {
        "100": 100,
        "16": "1rem",
      },
      padding: { SPACING },
      paddingTop: { SPACING },
      paddingBottom: { SPACING },
      paddingRight: { SPACING },
      paddingLeft: { SPACING },
      colors: {
        primary: {
          DEFAULT: "#FFBB9D", // OLD
          light: "#FFEBE2", // OLD
          dark: "#FFA883", // OLD
          110: "#011A0E",
          100: "#04331C",
          90: "#076638",
          10: "#DAE9E8",
        },
        secondary: {
          DEFAULT: "#04331C", // OLD
          110: "#D5F864",
          100: "#E8FE96",
          90: "#EFFFDC",
        },
        system: {
          purple: "#6938EF",
          gray: "#525252",
          green: "#039855",
          green110: "#054F31",
        },
      },
    },
  },
});
