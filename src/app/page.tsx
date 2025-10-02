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
          <Typography fontSize={22} textAlign={"center"} sx={{color:'gray'}}>
            Your Caption Generator for Instagram & Search Growth.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            width: "70%",
            margin: "auto",
            my: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 3,
            borderRadius:5,
          }}
        >
          <Box width={"100%"}>
            <Typography fontSize={20} fontWeight={700}>
              Your description here
            </Typography>

            <FormControl
              sx={{ width: "100% !important", my: 2, borderRadius: 9 }}
            >
              <TextField
                fullWidth
                placeholder="Describe what you want your caption for....."
                minRows={4}
                multiline
                sx={{
                  backgroundColor: "transparent !important",
                  width: "100% !important",
                  // border:'1px solid #ccc'
                }}
              />
            </FormControl>
          </Box>

          <Box width={"100%"} mt={3}>
            <Typography fontSize={20} fontWeight={700} >
              Additional Booster
            </Typography>

            <Box width={'60%'} display={"flex"} alignItems={'center'} gap={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, width: 120 }}
              >
                <InputLabel id="hastags-select">
                  Hashtags
                </InputLabel>
                <Select
                  labelId="hastags-select"
                  // id="age-select"
                  label="Hashtags"
                  value={age}
                  onChange={handleAgeChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>5</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>25</MenuItem>
                </Select>
              </FormControl>

              {/* caption */}
              <FormControl
                variant="standard"
                sx={{  minWidth: 190 }}
              >
                <InputLabel id="caption-select-label">
                  Caption length
                </InputLabel>
                <Select
                  labelId="caption-select-label"
                  id="caption-select-label"
                  // label="Caption Length"
                  value={captionLength}
                  onChange={handleCaptionChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'short'}>Short</MenuItem>
                  <MenuItem value={'long'}>long</MenuItem>
                  <MenuItem value={'one liner'}>One Liner</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}
