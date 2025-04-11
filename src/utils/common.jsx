export const getColor = (category) => {
  // Remove first and last character, then convert to uppercase
  const trimmedCat = category?.toUpperCase() || "";
console.log(trimmedCat)
  switch (trimmedCat) {
    case "RESIDENTIAL":
      return {
        background: "#1E90FF",
        text: "#FFFFFF"
      };
    case "COMMERCIAL":
      return {
        background: "#9370DB",
        text: "#FFFFFF"
      };
    case "INDUSTRIAL":
      return {
        background: "#8B4513",
        text: "#FFFFFF"
      };
    case "AGRICULTURE":
      return {
        background: "#32CD32",
        text: "#000000"
      };
    case "OPEN SPACE/PARKS":
      return {
        background: "#00CED1",
        text: "#000000"
      };
    case "PUBLIC":
      return {
        background: "#FFD700",
        text: "#000000"
      };
    case "SPECIFIC PURPOSE":
      return {
        background: "#2f9e44",
        text: "#FFFFFF"
      };
    case "PLANNED DEVELOPMENT":
      return {
        background: "#FF69B4",
        text: "#000000"
      };
    case "MIXED USE":
      return {
        background: "#FFA500",
        text: "#000000"
      };
    case "OVERLAY":
      return {
        background: "#9370DB",
        text: "#FFFFFF"
      };
    case "OTHER":
      return {
        background: "#708090",
        text: "#FFFFFF"
      };
    case "UNKNOWN":
      return {
        background: "#CCCCCC",
        text: "#000000"
      };
    default:
      return {
        background: "#EEEEEE",
        text: "#000000"
      };
  }
};
