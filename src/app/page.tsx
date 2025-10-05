"use client";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useThemeContext } from "./components/customTheme/ThemeProvider";
import { NightsStay, Sunny, Menu as MenuIcon } from "@mui/icons-material";
import Header from "./components/header/Header";
import React from "react";

export default function Home() {
  const [age, setAge] = React.useState<number>(0);
  const [captionLength, setCaptionLength] = React.useState<string>('');

  const handleAgeChange = (event: SelectChangeEvent<number>) => {
    setAge(event.target.value as number);
  };

  const handleCaptionChange = (event:SelectChangeEvent<string>)=>{
    setCaptionLength(event.target.value as string)
  }

  return (
    <Box>
      <Header />

      <Grid container maxWidth={"1340px"} margin={"auto"}>
        <Box width={"100%"} margin={"auto"} mt={10} textAlign={"center"}>
          <Typography fontSize={"3.4rem"} fontWeight={600}>
            INSTAGRAM CAPTION GENERATOR
          </Typography>
          <Typography fontSize={22} textAlign={'center'} color="textSecondary">Your Caption Generator for Instagram & Search Growth.</Typography>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}
