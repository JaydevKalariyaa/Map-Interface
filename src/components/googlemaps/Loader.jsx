// components/Loader.jsx
"use client";

import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        flexDirection: "column",
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "#1976d2", // You can change color here (MUI blue)
          mb: 2,
        }}
      />
      <Typography
        variant="h6"
        sx={{ color: "white", fontWeight: 500, letterSpacing: 1 }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
