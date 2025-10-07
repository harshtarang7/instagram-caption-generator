"use client"
import { Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { NightsStay, Sunny, Menu as MenuIcon } from "@mui/icons-material";
import { useThemeContext } from "../customTheme/ThemeProvider";

export default function Header() {
  const { toggleTheme, isDarkMode } = useThemeContext();
  return (
    <Box
    // borderBottom={'1px solid grey'}
    sx={{
      backgroundColor: isDarkMode?"":'#FFFFFF !important',
      borderBottom: isDarkMode ? '1px solid #a0a0a0ff' : '1px solid #E0E7F1 ',
      boxShadow: isDarkMode ? '' : '0 2px 8px rgba(147, 197, 253, 0.1)',
      width:'100%',
    }}
    >

    <Grid 
    container
    sx={{
        maxWidth:'1320px',
        padding:'10px 20px',
        margin:'auto',
        // borderBottom:1,
        justifyContent:'space-between',
        alignItems:'center'
    }}
    >
        <Grid>
        <Image
        src={isDarkMode?"/assets/darkmode-insta.png":"/assets/light.png"}
        width={150}
        height={100}
        alt="logo"
        />
        </Grid>

        <Grid>
       <IconButton onClick={toggleTheme}>
                {isDarkMode ? (
                  <NightsStay />
                ) : (
                  <Sunny sx={{ color: "orange" }} />
                )}
              </IconButton>
        </Grid>
      
    </Grid>
    </Box>
  );
}
