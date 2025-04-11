"use client";

import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FactoryIcon from "@mui/icons-material/Factory";
import { getColor } from "@/utils/common";

import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

// Sample address list (replace with real data if needed)

const addressOptions = [
  { value: {lat:35.1414401,lng:-80.9211991,address:"The Edison Arrowood"}, label: "The Edison Arrowood" },
 
];

export default function Sidebar({ filters, setFilters,category,selectedAddress,setSelectedAddress }) {
  const [open, setOpen] = useState(true);

  const toggleFilter = (catName) => {
    setFilters(
      filters.includes(catName)
      ? filters.filter((name) => name !== catName)
      : [...filters, catName]
    );
  };

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      {/* Menu Icon Button when sidebar is closed */}
      {!open && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)", // Center vertically
            zIndex: 1300,
            backgroundColor: "blue",
            boxShadow: 2,
            borderRadius: "50%",
            "&:hover": { backgroundColor: "blue" },
          }}
        >
          <ChevronRightIcon sx={{color:"white"}}/>
        </IconButton>
      )}

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
        //   width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
            boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        {/* Header with title and close button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 2,
            backgroundColor: "#2563eb",
            color: "#ffffff",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Parcel Map
          </Typography>
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: "#ffffff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ px: 2, mb: 2,mt:2 }}>
  
  <Select
    options={addressOptions}
    placeholder="Select address..."
    onChange={setSelectedAddress}
    value={selectedAddress}
    styles={{
      control: (base) => ({
        ...base,
        borderRadius: 8,
        borderColor: "#d1d5db",
        minHeight: 38,
        fontSize: 14,
      }),
      menu: (base) => ({ ...base, zIndex: 9999 }),
    }}
  />
</Box>


        {/* Filter List */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Zoning
          </Typography>
          <List sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
            {category.map((cat, index) => {
              const { background, text } = getColor(cat);
              return (
                <ListItem
                  key={cat+ index}
                  onClick={() => toggleFilter(cat)}
                  sx={{
                    borderRadius: 1.5,
                    mb: 0.5,
                    pl: 1,
                    "&:hover": { backgroundColor: "#e5e7eb" },
                    cursor: "pointer",
                  }}
                >
                  <Checkbox
                    edge="start"
                    checked={filters?.includes(cat)}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary={cat?.toLowerCase()
                      .replace(/_/g, " ")
                      .replace(/(?:^|\s)\S/g, function (a) {
                        return a.toUpperCase();
                      })}
                  />
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: background,
                      marginRight: 1,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
