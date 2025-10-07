"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { darkTheme, lightTheme } from "./customTheme";

interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const CustomThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  if (!mounted) {
    return null;
  }

  return (
    <CustomThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
