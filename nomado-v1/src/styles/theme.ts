// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2d9c78", // brand teal
    },
    secondary: {
      main: "#f97316", // brand orange
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    // Brand colors for HeroSection
    brand: {
      orange: "#f97316",
      orangeDark: "#ea580c",
      green: "#2d9c78",
      greenDark: "#059669",
      textOnBrand: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Geist", "Inter", sans-serif',
    h1: { fontSize: "3.5rem", fontWeight: 700 },
    h2: { fontSize: "2.5rem", fontWeight: 600 },
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});

// Module augmentation for TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    brand: {
      orange: string;
      orangeDark: string;
      green: string;
      greenDark: string;
      textOnBrand: string;
    };
  }

  interface PaletteOptions {
    brand?: {
      orange?: string;
      orangeDark?: string;
      green?: string;
      greenDark?: string;
      textOnBrand?: string;
    };
  }
}

export default theme;