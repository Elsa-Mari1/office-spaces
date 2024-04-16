import React from "react";
import Office from "./Office";
import { Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import companyDetails from "../data/CompanyData"; // Adjust the path as needed
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Home = () => {
  return (
    <Box sx={{ padding: "10px" }}>
      <Typography variant="h2">All Offices</Typography>
      {Object.values(companyDetails).map((company, index) => (
        <Box
          key={index}
          sx={{
            borderLeft: `6px solid ${company.color}`, // Adjust the color and thickness as needed
            paddingLeft: 2, // Add some padding to separate the content from the border
            marginBottom: 2, // Add some margin bottom between boxes
            borderRadius: "8px", // Curve the sides
            margin: "10px", // Add space around the outside of the box
          }}
        >
          <Office
            heading={company.heading}
            telephone={company.telephone}
            email={company.email}
            officeCapacity={company.officeCapacity}
            location={company.location}
            numberMembers={company.members.length}
          />
        </Box>
      ))}
      <AddCircleIcon
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          fontSize: 70, // Adjust the size of the icon as needed
          color: "primary.contrastText", // Use the primary color for the icon
          cursor: "pointer", // Show pointer cursor on hover
        }}
        onClick={() => {
          // Add your onClick logic here
          console.log("Button clicked!");
        }}
      />
    </Box>
  );
};

export default Home;
