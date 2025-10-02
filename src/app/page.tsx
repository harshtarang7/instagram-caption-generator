"use client";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useThemeContext } from "./components/customTheme/ThemeProvider";
import { NightsStay, Sunny, Menu as MenuIcon } from "@mui/icons-material";
import Header from "./components/header/Header";

export default function Home() {
  return (
    <Box>
      <Header />

      <Grid container maxWidth={"1340px"} margin={"auto"}>
        <Box width={"100%"} margin={"auto"} mt={10} textAlign={"center"}>
          <Typography fontSize={"3.4rem"} fontWeight={600}>
            INSTAGRAM CAPTION GENERATOR
          </Typography>
          <Typography fontSize={22} textAlign={"center"} color="textSecondary">
            Your Caption Generator for Instagram & Search Growth.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            width: "50%",
            margin: "auto",
            my: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding:2,
          }}
        >
          <Box>
            <Typography fontSize={20} fontWeight={700}>
              Your description here
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}
