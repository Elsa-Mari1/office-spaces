import React, { useState, useEffect } from "react";
import OfficeBlock from "./OfficeBlock";
import { Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import companyDetails from "../data/CompanyData"; // Adjust the path as needed
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import AddOffice from "./AddOffice";

const Home = () => {
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const handleClick = (companyId) => {
    // Redirect to the component with the specific company details as input
    console.log("companyId", companyId);
    navigate(`/office/${companyId}`);
  };
  console.log("data", data);
  console.log("Object.entries(data)", Object.entries(data));
  useEffect(() => {
    setData(companyDetails);
  }, [companyDetails]);
  console.log("companyDetails", companyDetails);
  console.log(
    "kyk",
    Object.entries(data).map(([companyId, company], index) => company.members)
  );

  // Function to add a new office to companyDetails
  const handleAddOffice = (newOffice) => {
    const newId = Object.keys(data).length;
    data[newId] = newOffice;
    // You may need to update state if companyDetails is stored in state
    setData({ ...data, [newId]: newOffice });
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <Typography variant="h2">All Offices</Typography>
      {Object.entries(data).map(([companyId, company], index) => (
        <Box
          key={index}
          sx={{
            borderLeft: `6px solid ${company.color}`, // Adjust the color and thickness as needed
            paddingLeft: 2, // Add some padding to separate the content from the border
            marginBottom: 2, // Add some margin bottom between boxes
            borderRadius: "8px", // Curve the sides
            margin: "20px 20px 40px 20px", // Add space around the outside of the box
            marginBottom: "40px",
            boxShadow: "0 0 10px #999",
          }}
          onClick={() => handleClick(companyId)}
        >
          <OfficeBlock
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
          //   color: "primary.contrastText", // Use the primary color for the icon
          cursor: "pointer", // Show pointer cursor on hover
        }}
        onClick={() => {
          openModal();
          console.log("Button clicked!");
        }}
      />
      <AddOffice
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddOffice={handleAddOffice}
      />
    </Box>
  );
};

export default Home;
