"use client"
import { Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { NightsStay, Sunny, Menu as MenuIcon } from "@mui/icons-material";
import { useThemeContext } from "../customTheme/ThemeProvider";

export default function Header() {
  const { toggleTheme, isDarkMode } = useThemeContext();
  return (
    <Box
    borderBottom={'1px solid grey'}>

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
        src={"/assets/ai_logo.png"}
        width={250}
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
