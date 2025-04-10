"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ParcelPopupCard({ feature ,setSelectedFeature}) {
  // Temporary dummy data
  const {
    category = "Residential",
    owner = "John Doe",
    area = "3500 sqft",
    image = "https://photos.zillowstatic.com/fp/a6e5f0a5190e8a73e4eb3ac53c302d6b-cc_ft_960.webp",
    propertyType = "Single Family Home",
    address = "123 Main St, Marietta, GA",
    lastUpdated = "2024-03-20",
    estimatedValue = "$520,000",
  } = feature?.properties || {};

  return (
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
          ":hover": { backgroundColor: "#f3f4f6" }
        }}
        onClick={() => setSelectedFeature(null)} // Replace with proper close function if needed
      >
        <CloseIcon />
      </IconButton>

      <CardMedia
        component="img"
        height="160"
        image={image}
        alt="Property"
        sx={{ objectFit: "cover",opacity: 0.8 }}
      />

      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          {propertyType}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {address}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
          <Typography variant="body1">
            <strong>Category:</strong> {category}
          </Typography>
          <Typography variant="body1">
            <strong>Owner:</strong> {owner}
          </Typography>
          <Typography variant="body1">
            <strong>Area:</strong> {area}
          </Typography>
          <Typography variant="body1">
            <strong>Value:</strong> {estimatedValue}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={2}
        >
          Last Updated: {lastUpdated}
        </Typography>
      </CardContent>
    </Card>
  );
}
