"use client";
import {
  Box,
  Button,
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
import { NightsStay, Sunny, Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import { BoosterConfig } from "@/utils/interfaces";
import { useInstagramCaption } from "@/utils/custom.hook";
import { useThemeContext } from "@/components/customTheme/ThemeProvider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";

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

  const { isDarkMode } = useThemeContext();
  return (
    <Box pb={3}>
      <Header />

      <Grid container maxWidth={"1340px"} margin={"auto"}>
        <Grid size={{ lg: 12, sm: 12, md: 12 }}>
          <Box width={"100%"} margin={"auto"} mt={10} textAlign={"center"}>
            <Typography fontSize={"3.4rem"} fontWeight={600}>
              INSTAGRAM CAPTION GENERATOR
            </Typography>
            <Typography
              fontSize={24}
              textAlign={"center"}
              sx={{ color: "gray" }}
            >
              Your AI powered caption generator for Instagram.
            </Typography>
          </Box>
        </Grid>

        <Grid margin={"auto"} size={{ lg: 10, sm: 12, md: 11 }}>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              margin: "auto",
              mt: 6,
              mb: 3,
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
                justifyContent={"space-between"}
                gap={3}
              >
                {boostersData.map((booster, index) => {
                  return (
                    <FormControl
                      key={index}
                      variant="standard"
                      sx={{ m: 1, minWidth: 180 }}
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
          <Button
            variant="contained"
            color={isDarkMode ? "secondary" : "primary"}
            sx={{
              fontSize: 21,
              fontWeight:600
            }}
            
          >
            Generate Caption
          </Button>
        </Grid>

        <Grid size={{ lg: 10, sm: 12, md: 11 }} margin={"auto"} my={5}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
