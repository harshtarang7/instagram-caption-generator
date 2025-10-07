import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box width={"100%"} my={3}>
      <Typography fontSize={24} fontWeight={600}>
        How to generate caption?
      </Typography>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
        }}
      >
        <li>Describe what your caption is about</li>
        <li>Select how many hastags you want</li>
        <li>Select your caption vibes</li>
        <li>What would be the length for caption.(short/long/one liner)</li>
        <li>Now click on generate caption button to generate.</li>
        <li>Now use the generated caption on your instagram.</li>
      </ul>
    </Box>
  );
};
export default Footer;
