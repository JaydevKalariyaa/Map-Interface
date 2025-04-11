"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Drawer,
  Tabs,
  Tab,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

export default function ParcelPopupCard({ feature, setSelectedFeature }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  if (!feature) return null;

  const {
    properties,
    geometry,
  } = feature;
console.log(properties,geometry)
  const { address, owners, assessedValue, marketValue, lotInfo, structure, lastSale, coordinates, legalDescription, apn, color } = properties || {};

  const fullAddress = `${address?.street || ""}, ${address?.city || ""}, ${address?.state || ""} ${address?.zip || ""}`;

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex);

  return (
    <>
      <Card sx={{ width: { xs: "90vw", sm: 800 }, maxHeight: "90vh", boxShadow: 6, borderRadius: 3, overflowY: "auto", position: "relative" }}>
        <IconButton sx={{ position: "absolute", top: 10, right: 10, zIndex: 2, backgroundColor: "#fff" }} onClick={() => setSelectedFeature(null)}>
          <CloseIcon />
        </IconButton>

        <CardMedia
  component="div"
  sx={{
    height: 300,
    backgroundImage: `url("https://maps.googleapis.com/maps/api/streetview?location=1967+E+5650+S+%2C+South+Ogden%2C+UT+84403&size=960x720&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=dAf4otC9YW-snGMhfTNz6t3As1E=")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    opacity: 0.85,
  }}
/>


        <CardContent>
          <Typography variant="h6" fontWeight={700}>Property: {apn}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{fullAddress}</Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={1}>Owner: {owners?.join(", ")}</Typography>

          <Divider sx={{ my: 2 }} />

          <Button variant="outlined" onClick={() => setDrawerOpen(true)}>View More</Button>
        </CardContent>
      </Card>

      {/* Drawer with Tabs */}
      <Drawer anchor="right" open={drawerOpen}  onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: { xs: "100vw", sm: 800 } } }}>
        <Box sx={{ backgroundColor: "#1976d2", color: "#fff", p: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Parcel Details</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Overview" />
          <Tab label="Assessed Value" />
          <Tab label="Lot Info" />
          <Tab label="Structure" />
          <Tab label="Sale History" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {tabIndex === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoCard label="Address" value={fullAddress} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Owner(s)" value={owners?.join(", ") || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Parcel ID" value={apn || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Category" value={feature.mainCategory || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Legal Description" value={legalDescription || "N/A"} />
              </Grid>
            </Grid>
          )}

          {tabIndex === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoCard label="Total Assessed" value={assessedValue?.total || "N/A"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard label="Land Value" value={assessedValue?.land || "N/A"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard label="Improvements" value={assessedValue?.improvements || "N/A"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard label="Year" value={assessedValue?.year || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Improvement %" value={properties.improvementPercent || "N/A"} />
              </Grid>
            </Grid>
          )}

          {tabIndex === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoCard label="Lot Size" value={lotInfo?.size || "N/A"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard label="Zoning" value={lotInfo?.zoning || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Land Use" value={lotInfo?.landUse || "N/A"} />
              </Grid>
            </Grid>
          )}

          {tabIndex === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoCard label="Year Built" value={structure?.yearBuilt || "N/A"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard label="Living Area" value={structure?.livingArea || "N/A"} />
              </Grid>
            </Grid>
          )}

          {tabIndex === 4 && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoCard label="Last Sale Date" value={lastSale?.date || "N/A"} />
              </Grid>
              <Grid item xs={6}>
                <InfoCard label="Last Sale Price" value={lastSale?.price || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Buyers" value={lastSale?.buyers?.join(", ") || "N/A"} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard label="Document Type" value={lastSale?.documentType || "N/A"} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Drawer>
    </>
  );
}

function InfoCard({ label, value }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={600}>
        {value}
      </Typography>
    </Paper>
  );
}
