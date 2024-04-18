import React, { useState } from "react";
import OfficeBlock from "./OfficeBlock";
import { Typography, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import svgColors from "../data/SvgColors";

const CustomButton = styled(Button)({
  backgroundColor: "#007bff", // Example background color
  color: "white", // Example text color
  borderRadius: "20px", // Set the border radius
  width: "300px", // Set the width
  "&:hover": {
    backgroundColor: "#0056b3", // Example hover background color
  },
});

const AddOffice = ({ isOpen, onClose, onAddOffice }) => {
  const [officeName, setOfficeName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();
  const handleHomeButton = () => {
    onClose();
  };

  const handleAddOffice = () => {
    // Check if all required fields are filled
    if (
      officeName.trim() === "" ||
      physicalAddress.trim() === "" ||
      emailAddress.trim() === "" ||
      phoneNumber.trim() === "" ||
      maxCapacity === null ||
      selectedColor === null
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create new member object
    const newOffice = {
      heading: `${officeName}`,
      telephone: `${phoneNumber}`,
      email: `${emailAddress}`,
      officeCapacity: maxCapacity,
      location: `${physicalAddress}`,
      color: `${selectedColor}`,
      members: [],
    };

    // Pass new member data to parent component
    onAddOffice(newOffice);

    // Clear input fields
    setOfficeName("");
    setPhysicalAddress("");
    setEmailAddress("");
    setPhoneNumber("");
    setMaxCapacity(null);
    setSelectedColor(null);

    // Close the modal
    onClose();
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Box sx={{ padding: "30px" }}>
        <Grid container item xs={12} alignItems="center">
          <Grid item xs={6} display="inline-flex">
            <ArrowBackIcon
              onClick={handleHomeButton}
              sx={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={6} justifyContent="flex-end">
            <Typography variant="h5">New Office</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Office Name"
              variant="outlined"
              sx={{ display: "block" }}
              fullWidth
              value={officeName}
              onChange={(e) => setOfficeName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Physical Address"
              variant="outlined"
              sx={{ display: "block" }}
              fullWidth
              value={physicalAddress}
              onChange={(e) => setPhysicalAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              sx={{ display: "block" }}
              fullWidth
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              sx={{ display: "block" }}
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Maximum Capacity"
              variant="outlined"
              sx={{ display: "block" }}
              fullWidth
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(Number(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Office Color</Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            display: "flex",
            padding: "30px",
          }}
        >
          {Object.values(svgColors).map((imageName, index) => (
            <Grid
              item
              xs={6}
              sm={3}
              md={3}
              lg={2}
              key={index}
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectedColor(imageName.color);
                console.log("imageName", imageName);
              }}
            >
              <img
                src={imageName.value} // Path to the SVG image
                alt={imageName.color} // Alt text for accessibility
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "50%",
                  border:
                    selectedColor === imageName.color ? "3px solid black" : "",
                }} // Style to ensure the image fits within the grid item
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingTop: "5px",
          }}
        >
          <CustomButton onClick={handleAddOffice}>ADD OFFICE</CustomButton>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddOffice;
