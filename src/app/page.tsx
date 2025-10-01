"use client"
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useThemeContext } from "./components/customTheme/ThemeProvider";
import { NightsStay, Sunny, Menu as MenuIcon } from "@mui/icons-material";
import Header from "./components/header/Header";

export default function Home() {
  const { toggleTheme, isDarkMode } = useThemeContext();
  return (
    <Box>
      <Header/>
       
      instagram caption generator
    </Box>
  );
}
