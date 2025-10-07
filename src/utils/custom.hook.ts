import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { BoosterConfig } from "./interfaces";

const useInstagramCaption = () => {
  const [hashtags, setHashtags] = React.useState<number>(0);
  const [captionLength, setCaptionLength] = React.useState<string>("");
  const [seo, setSeo] = React.useState<string>("");
  const [captionVibe, setCaptionVibe] = React.useState<string>("");

  const handleHashtagsChange = (event: SelectChangeEvent<number>) => {
    setHashtags(event.target.value as number);
  };

  const handleCaptionChange = (event: SelectChangeEvent<string>) => {
    setCaptionLength(event.target.value as string);
  };

  const handleSeoChange = (event: SelectChangeEvent<string>) => {
    setSeo(event.target.value as string);
  };

  const handleCaptionVibeChange = (event: SelectChangeEvent<string>) => {
    setCaptionVibe(event.target.value as string);
  };
  const boostersData: (BoosterConfig<number> | BoosterConfig<string>)[] = [
    {
      id: "hashtags",
      label: "Hashtags",
      value: hashtags,
      onChange: handleHashtagsChange,
      options: [
        { value: "", label: "None" },
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 25, label: "25" },
      ],
      minWidth: 120,
    },
    {
      id: "caption-length",
      label: "Caption length",
      value: captionLength,
      onChange: handleCaptionChange,
      options: [
        { value: "", label: "None" },
        { value: "short", label: "Short" },
        { value: "long", label: "Long" },
        { value: "one liner", label: "One Liner" },
      ],
      minWidth: 190,
    },
    {
      id: "seo",
      label: "SEO",
      value: seo,
      onChange: handleSeoChange,
      options: [
        { value: "", label: "None" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
      minWidth: 120,
    },
    {
      id: "caption-vibe",
      label: "Caption Vibes",
      value: captionVibe,
      onChange: handleCaptionVibeChange,
      options: [
        { value: "", label: "None" },
        { value: "funny", label: "Funny" },
        { value: "serious", label: "Serious" },
        { value: "wholesome", label: "Wholesome" },
        { value: "motivational", label: "Motivational" },
        { value: "aesthetic", label: "Aesthetic" },
        { value: "introspective", label: "Introspective" },
      ],
      minWidth: 120,
    },
  ];

  return {
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
  };
};
export { useInstagramCaption };
