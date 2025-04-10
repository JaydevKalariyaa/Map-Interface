"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  Drawer,
  Grid as Grid2,
  TextField,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

export default function ParcelPopupCard({ feature, setSelectedFeature }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  if (!feature) return null;

  const {
    BUILDING_ADDRESS,
    AREA_SQFT,
    HEIGHT_MAX_FT,
    OWNER_NAME,
    SITE_ADDR,
    SITE_CITY,
    SITE_STATE,
    SITE_ZIP,
    STATE,
    ZIP,
    buildingAddress,
    buildingInfo,
    CITY,
    USE_CODE_MUNI_DESC,
    PARCEL_LID,
    FIPS_CODE,
  } = feature;

  const {
    height = HEIGHT_MAX_FT || "N/A",
    area = AREA_SQFT || "N/A",
  } = buildingInfo || {};

  const fullParcelAddress = `${SITE_ADDR || "N/A"}, ${SITE_CITY || ""}, ${SITE_STATE || ""} ${SITE_ZIP || ""}`;
  const fullBuildingAddress = `${BUILDING_ADDRESS || buildingAddress || "N/A"}, ${CITY || ""}, ${STATE || ""} ${ZIP || ""}`;

  const handleEdit = () => {
    setFormValues({
      parcelId: PARCEL_LID || "",
      siteAddress: fullParcelAddress,
      owner: OWNER_NAME || "",
      category: USE_CODE_MUNI_DESC || "",
      buildingAddress: fullBuildingAddress,
      area: Number(area),
      height: Number(height),
      fips: FIPS_CODE || "",
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Saved values:", formValues);
    setIsEditing(false);
  };

  return (
    <>
      <Card
        sx={{
          width: { xs: "90vw", sm: 800 },
          maxHeight: "90vh",
          boxShadow: 6,
          borderRadius: 3,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            backgroundColor: "#fff",
            ":hover": { backgroundColor: "#f3f4f6" },
          }}
          onClick={() => setSelectedFeature(null)}
        >
          <CloseIcon />
        </IconButton>

        <CardMedia
  component="div"
  sx={{
    height: 400, // ✅ now height works!
    backgroundImage:
      "url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.75,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  }}
/>

        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={700}>
            Parcel: {feature?.PARCEL_LID}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Site Address: {fullParcelAddress}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {USE_CODE_MUNI_DESC}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
            <Typography variant="body1">
              <strong>Owner:</strong> {OWNER_NAME || "Unknown"}
            </Typography>
            <Typography variant="body1">
              <strong>Building Address:</strong> {fullBuildingAddress}
            </Typography>
            <Typography variant="body1">
              <strong>Building Area:</strong> {Number(area).toLocaleString()} sqft
            </Typography>
            <Typography variant="body1">
              <strong>Building Height:</strong> {Number(height).toFixed(1)} ft
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={2}
          >
            FIPS Code: {feature?.FIPS_CODE}
          </Typography>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
              View More
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Drawer */}
      <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={()=>setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 800 },
          maxWidth: "100%",
          height: "100%",
          right: 0,
          left: "auto",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
        
        },
      }}
    >
      {/* Close Button */}
     

      {/* Tabs */}
     <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0082CC",
        color: "#fff",
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="h6">Property Details</Typography>
      <IconButton
        onClick={()=>setDrawerOpen(false)}
        sx={{
          color: "#fff",
        }}
      >
        <CloseIcon />
      </IconButton>
     </Box>
     <Box   sx= {{
        
          p: 2, // ✅ adds padding (theme spacing unit, 3 = 24px)
        }}>

      {/* Address Card */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#EAF4FF",
          display: "flex",
          alignItems: "center",
          p: 2,
          mb: 2,
         
         
        }}
      >
        <LocationOnIcon color="#0082CC" sx={{ mr: 1 }} />
        <Typography fontWeight={600}>{fullParcelAddress}</Typography>
      </Paper>

      {/* Overview Grid */}
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <InfoCard label="Tenant" value={OWNER_NAME || "Unknown"} />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <InfoCard label="Category" value={USE_CODE_MUNI_DESC || "N/A"} />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <InfoCard label="Building Address" value={fullBuildingAddress} />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <InfoCard label="Building Area" value={`${Number(AREA_SQFT).toLocaleString()} sqft`} />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <InfoCard label="Building Height" value={`${Number(HEIGHT_MAX_FT).toFixed(1)} ft`} />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <InfoCard label="Parcel ID" value={PARCEL_LID || "N/A"} />
        </Grid2>
      </Grid2>
      </Box>
    </Drawer>
    </>
  );
}
function InfoCard({ label, value }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={500}
        gutterBottom
      >
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={600}>
        {value}
      </Typography>
    </Paper>
  );
}