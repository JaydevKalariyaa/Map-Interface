"use client";

import React from "react";
import { Slider, Typography, Box, IconButton, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const minYear = 2000;
const maxYear = 2025;

export default function Timeline({ year, onChange }) {
  const handleStep = (direction) => {
    const newYear = year + direction;
    if (newYear >= minYear && newYear <= maxYear) {
      onChange(newYear);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        boxShadow: 4,
        minWidth: 280,
      }}
    >
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{ fontWeight: 600, textAlign: "center" }}
      >
        Year: {year}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton onClick={() => handleStep(-1)} disabled={year <= minYear}>
          <ChevronLeftIcon />
        </IconButton>

        <Slider
          min={minYear}
          max={maxYear}
          step={1}
          value={year}
          onChange={(e, val) => onChange(val)}
          valueLabelDisplay="off"
          sx={{
            flexGrow: 1,
            height: 4,
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
            '& .MuiSlider-track': {
              border: 'none',
            },
          }}
        />

        <IconButton onClick={() => handleStep(1)} disabled={year >= maxYear}>
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
