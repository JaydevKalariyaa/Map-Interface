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
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

export default function ParcelPopupCard({ feature, setSelectedFeature }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  if (!feature) return null;

  const { details } = feature;
  const {
    PARCEL_APN,
    MAIL_ADDR,
    OWNER_NAME_1,
    OWNER_NAME_2,
    OWNERSHIP_STATUS_DESC,
    OWNERSHIP_STATUS_CODE,
    SITE_ADDR,
    COUNTY,
    ALTERNATE_APN,
    CENSUS_TRACT,
    FIPS_CODE,
    ZONING_CATEGORY,

    DATE_TRANSFER,
    PRICE_PER_ACRE,
    PRICE_PER_SQFT,
    SELLER_NAME,
    DOC_NUMBER,
    TITLE_COMPANY_NAME,

    // Property Characteristics
    YR_BLT,
    BUILDING_SQFT,
    FIN_SQFT_TOT,
    BEDROOMS,
    TOTAL_BATHS,
    STORIES_NUMBER,
    BUILDING_COUNT,
    CONSTRUCTION_CODE_DESC,
    ROOF_COVER_DESC,
    HEATING_DESC,
    AIR_CONDITIONING_TYPE_DESC,
    FIREPLACE_NUMBER,

    // Prior Sale Information
    PRIOR_SALE_DOC_NUMBER,
    PRIOR_SALE_SELLER_NAME,
    PRIOR_SALE_TITLE_COMPANY_NAME,
    PRIOR_SALE_VAL_TRANSFER,
  } = details || {};
  console.log("feature------------------", details);
  // const fullAddress = details?.SITE_ADDR || '--'; // fallback if address not split
  const ownerNames =
    [OWNER_NAME_1, OWNER_NAME_2].filter(Boolean).join(", ") || "--";

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex);

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
          }}
          onClick={() => setSelectedFeature(null)}
        >
          <CloseIcon />
        </IconButton>

        <CardMedia
          component="div"
          sx={{
            height: 300,
            backgroundImage: `url("https://maps.googleapis.com/maps/api/streetview?location=${encodeURIComponent(
              SITE_ADDR
            )}&size=960x720&key=${
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            }&source=outdoor")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            opacity: 0.85,
          }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Property: {SITE_ADDR}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {MAIL_ADDR}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={1}>
            Owner: {ownerNames}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
            View More
          </Button>
        </CardContent>
      </Card>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100vw", sm: 900 } } }}
      >
        <Box
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Parcel Details</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => alert("Download functionality here")}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Owner Info" />
          <Tab label="Location Info" />
          <Tab label="Last Sale Info" />
          <Tab label="Property Characteristics" />
          <Tab label="Prior Sale Info" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {/* Owner Info Tab */}
          {tabIndex === 0 && (
            <Grid container spacing={2}>
              <Grid size={6}>
                <InfoCard label="Owner Name(s)" value={ownerNames || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Mailing Address" value={MAIL_ADDR || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Ownership Status"
                  value={OWNERSHIP_STATUS_DESC || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Vesting Code"
                  value={OWNERSHIP_STATUS_CODE || "--"}
                />
              </Grid>
            </Grid>
          )}

          {/* Location Info Tab */}
          {tabIndex === 1 && (
            <Grid container spacing={2} columns={12}>
              <Grid size={6}>
                <InfoCard label="Parcel Number" value={PARCEL_APN || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Alternate APN" value={ALTERNATE_APN || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="County" value={COUNTY || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="FIPS Code" value={FIPS_CODE || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Census Tract" value={CENSUS_TRACT || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Zoning" value={ZONING_CATEGORY || "--"} />
              </Grid>
            </Grid>
          )}

          {/* Last Sale Info Tab */}
          {tabIndex === 2 && (
            <Grid container spacing={2}>
              <Grid size={6}>
                <InfoCard label="Sale Date" value={DATE_TRANSFER || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Seller Name" value={SELLER_NAME || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Price Per Acre"
                  value={PRICE_PER_ACRE ? `$${PRICE_PER_ACRE}` : "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Price Per SqFt"
                  value={PRICE_PER_SQFT ? `$${PRICE_PER_SQFT}` : "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Document Number" value={DOC_NUMBER || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Title Company"
                  value={TITLE_COMPANY_NAME || "--"}
                />
              </Grid>
            </Grid>
          )}
          {/* Property Characteristics Tab */}
          {tabIndex === 3 && (
            <Grid container spacing={2}>
              <Grid size={6}>
                <InfoCard label="Year Built" value={YR_BLT || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Building Square Feet"
                  value={BUILDING_SQFT || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Finished Square Feet Total"
                  value={FIN_SQFT_TOT || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Bedrooms" value={BEDROOMS || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Total Baths" value={TOTAL_BATHS || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Stories" value={STORIES_NUMBER || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Building Count"
                  value={BUILDING_COUNT || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Construction Code"
                  value={CONSTRUCTION_CODE_DESC || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Roof Cover" value={ROOF_COVER_DESC || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard label="Heating" value={HEATING_DESC || "--"} />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Air Conditioning"
                  value={AIR_CONDITIONING_TYPE_DESC || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Fireplace Number"
                  value={FIREPLACE_NUMBER || "--"}
                />
              </Grid>
            </Grid>
          )}
          {/* Prior Sale Info Tab */}
          {tabIndex === 4 && (
            <Grid container spacing={2}>
              <Grid size={6}>
                <InfoCard
                  label="Transfer Doc. No."
                  value={PRIOR_SALE_DOC_NUMBER || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Seller Name"
                  value={PRIOR_SALE_SELLER_NAME || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Title Company"
                  value={PRIOR_SALE_TITLE_COMPANY_NAME || "--"}
                />
              </Grid>
              <Grid size={6}>
                <InfoCard
                  label="Sale Price"
                  value={
                    PRIOR_SALE_VAL_TRANSFER
                      ? `$${PRIOR_SALE_VAL_TRANSFER}`
                      : "--"
                  }
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Drawer>
    </>
  );
}

const InfoCard = ({ label, value }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      borderRadius: 3,
      backgroundColor: "#f9fafb",
      minHeight: 50,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#f1f5f9",
      },
    }}
  >
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ fontWeight: 600 }}
    >
      {label.toUpperCase()}
    </Typography>
    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b" }}>
      {value || "--"}
    </Typography>
  </Paper>
);
