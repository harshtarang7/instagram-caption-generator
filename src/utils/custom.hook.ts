import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { BoosterConfig } from "./interfaces";

const useInstagramCaption = () => {
  const [hashtags, setHashtags] = React.useState<number>(0);
  const [captionLength, setCaptionLength] = React.useState<string>("");
  const [seo, setSeo] = React.useState<string>("");
  const [captionVibe, setCaptionVibe] = React.useState<string>("");
  const [userDescription, setUserDescription] = React.useState<string>("");
  const [generatedCaption, setGeneratedCaption] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [aiProvider, setAiProvider] = React.useState<string>("gemini");

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

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserDescription(event.target.value);
  };

  const generateCaption = async () => {
    if (!userDescription.trim()) {
      setError("Please provide a description for your caption");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedCaption("");
    try {
      const payload = {
        description: userDescription,
        hashtags: hashtags,
        captionLength: captionLength,
        seo: seo,
        captionVibe: captionVibe,
        aiProvider: aiProvider,
      };

      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const data = await response.json();
      if (data.success && data.caption) {
        setGeneratedCaption(data.caption);
      } else {
        throw new Error(data.error || "No caption generated");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = async () => {
    if (generatedCaption) {
      try {
        await navigator.clipboard.writeText(generatedCaption);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return false;
  };

  const resetForm = () => {
    setHashtags(0);
    setCaptionLength("");
    setSeo("");
    setCaptionVibe("");
    setUserDescription("");
    setGeneratedCaption("");
    setError("");
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
    captionVibe,
    userDescription,
    generatedCaption,
    loading,
    error,
    aiProvider,
    boostersData,

    // State setters
    setHashtags,
    setCaptionLength,
    setSeo,
    setCaptionVibe,
    setUserDescription,
    setGeneratedCaption,
    setAiProvider,
    setError,

    // Handlers
    handleHashtagsChange,
    handleCaptionChange,
    handleSeoChange,
    handleCaptionVibeChange,
    handleDescriptionChange,
    
    // Actions
    generateCaption,
    copyToClipboard,
    resetForm,
  };
};
export { useInstagramCaption };
