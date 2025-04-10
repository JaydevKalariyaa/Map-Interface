 export const getColor = (category) => {

    // const mainCategory=getcategoryFromSubCategory(category);
    // Convert to lowercase for case-insensitive matching
    const cat = category?.toLowerCase?.() || "";
    
    // Define colors with appropriate text contrast
    switch (cat) {
      case "residential":
        return { 
          background: "#1E90FF", // DodgerBlue
          text: "#FFFFFF" // White text on dark blue
        };
      case "commercial":
        return { 
          background: "#9370DB", // OrangeRed
          text: "#FFFFFF" // White text on dark orange
        };
      case "industrial":
        return { 
          background: "#8B4513", // SaddleBrown
          text: "#FFFFFF" // White text on brown
        };
      case "agricultural":
        return { 
          background: "#32CD32", // LimeGreen
          text: "#000000" // Black text on bright green
        };
      case "exempt":
        return { 
          background: "#2f9e44", // MediumPurple
          text: "#FFFFFF" // White text on purple
        };
      case "utility":
        return { 
          background: "#FFD700", // Gold
          text: "#000000" // Black text on gold
        };
      case "vacant":
        return { 
          background: "#DCDCDC", // Gainsboro
          text: "#000000" // Black text on light gray
        };
      case "recreational":
        return { 
          background: "#00CED1", // DarkTurquoise
          text: "#000000" // Black text on turquoise
        };
      case "transportation":
        return { 
          background: "#FF69B4", // HotPink
          text: "#000000" // Black text on pink
        };
      case "other":
        return { 
          background: "#708090", // SlateGray
          text: "#FFFFFF" // White text on slate gray
        };
      default:
        return { 
          background: "#CCCCCC", // Light Gray
          text: "#000000" // Black text on light gray
        };
    }
  };

  