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
import { BoosterConfig } from "@/utils/interfaces";
import { useInstagramCaption } from "@/utils/custom.hook";

export default function Home() {
  const {
    hashtags,
    captionLength,
    seo,
    boostersData,

    setHashtags,
    setCaptionLength,
    setSeo,

    handleHashtagsChange,
    handleCaptionChange,
    handleSeoChange,
  } = useInstagramCaption();

  return (
    <Box>
      <Header />

      <Grid container maxWidth={"1340px"} margin={"auto"}>
        <Box width={"100%"} margin={"auto"} mt={10} textAlign={"center"}>
          <Typography fontSize={"3.4rem"} fontWeight={600}>
            INSTAGRAM CAPTION GENERATOR
          </Typography>
          <Typography fontSize={22} textAlign={"center"} sx={{ color: "gray" }}>
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
            borderRadius: 5,
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
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    border: "1px solid #ccc",
                    backgroundColor: "transparent",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", 
                  },
                }}
              />
            </FormControl>
          </Box>

          <Box width={"100%"} mt={3}>
            <Typography fontSize={20} fontWeight={700}>
              Additional Booster
            </Typography>
            <Box
              // border={1}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              gap={3}
            >
              {boostersData.map((booster, index) => {
                return (
                  <FormControl
                    key={index}
                    variant="standard"
                    sx={{ m: 1, minWidth: 160 }}
                  >
                    <InputLabel id={booster.id}>{booster.label}</InputLabel>
                    <Select
                      labelId={booster.id}
                      id={booster.id}
                      label={booster.label}
                      value={booster.value}
                      onChange={
                        booster.onChange as (
                          event: SelectChangeEvent<number | string>
                        ) => void
                      }
                    >
                      {booster.options.map((option, index) => {
                        return (
                          <MenuItem value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}
