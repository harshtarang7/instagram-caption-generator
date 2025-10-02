'use client'
import { createTheme } from '@mui/material/styles';

import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const backgroundConstantColorLight = '#FDF6F0';
export const backgroundConstantColorDark = '#1E1E1E';


// Your existing dark theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFBFA9",
      dark: "#42a5f5",
      light: "#e3f2fd",
    },
    secondary: {
      main: "#A6E3E9", 
      dark: "#ad1457",
      light: "#fce4ec",
    },
    background: {
      default: backgroundConstantColorDark,  
      paper: "#2C2C2C",
    },
    text: {
      primary: "#FDF6F0",
      secondary: "#D1D1D1",
    },
    divider: "#333333",
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#C8A2C8",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: `${raleway.style.fontFamily}, Arial, sans-serif`,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.825rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #333333",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
          borderRight: "1px solid #333333",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRight: "1px solid #333333",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#333333",
            },
            "&:hover fieldset": {
              borderColor: "#555555",
            },
          },
        },
      },
    },
  },
});

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFBFA9",
      dark: "#115293",
      light: "#42a5f5",
    },
    secondary: {
      main: "#A6E3E9", 
      dark: "#9a0036",
      light: "#f5336a",
    },
     background: {
      default: backgroundConstantColorLight,  
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    divider: "#e0e0e0",
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
    info: {
      main: "#C8A2C8",
    },
    success: {
      main: "#2e7d32",
    },
  },
  typography: {
    fontFamily: `${raleway.style.fontFamily}, Arial, sans-serif`,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.825rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          color: "#000000",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#bdbdbd",
            },
          },
        },
      },
    },
  },
});

