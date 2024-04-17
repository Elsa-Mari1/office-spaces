import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
// import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Custom styling for the Button component
const CustomButton = styled(Button)({
  // Add your custom styles here
  backgroundColor: "#007bff", // Example background color
  color: "white", // Example text color
  borderRadius: "20px", // Set the border radius
  width: "300px", // Set the width
  "&:hover": {
    backgroundColor: "#0056b3", // Example hover background color
  },
});

const NewStaffmemberModal = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page of the modal

  const handleNextPage = () => {
    setCurrentPage(2); // Move to the second page
  };
  const handleBackPage = () => {
    setCurrentPage(1); // Move to the second page
  };

  // Array of SVG file names
  const svgImages = [
    "balloon_man.svg",
    "baseball_man.svg",
    "flying_man.svg",
    "moon_man.svg",
    "one_balloon_man.svg",
    "planet_man.svg",
    "rocket_man.svg",
  ];
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          maxWidth: "30%", // Set maximum width for the modal
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {currentPage === 1 && (
            <>
              <Grid container item xs={12}>
                <Grid item xs={6} display="inline-flex">
                  <Typography variant="h5">New Staff Member</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <HighlightOffIcon
                    onClick={onClose}
                    sx={{ cursor: "pointer" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    sx={{ display: "block" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    sx={{ display: "block" }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",

                    backgroundColor: currentPage === 1 ? "black" : "white",
                    border: "1px solid black",
                    marginRight: "5px",
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",

                    backgroundColor: currentPage === 2 ? "black" : "white",
                    border: "1px solid black",
                    marginRight: "5px",
                  }}
                ></Box>
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
                <CustomButton onClick={handleNextPage}>Next</CustomButton>
              </Grid>
            </>
          )}
          {currentPage === 2 && (
            <>
              <Grid container item xs={12} alignItems="center">
                <Grid item xs={9} display="inline-flex">
                  <ArrowBackIcon
                    onClick={handleBackPage}
                    sx={{ cursor: "pointer" }}
                  />
                  <Typography variant="h5">New Staff Member</Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="flex-end">
                  <HighlightOffIcon
                    onClick={onClose}
                    sx={{ cursor: "pointer" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Avatar</Typography>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                {svgImages.map((imageName, index) => (
                  <Grid item xs={6} sm={3} md={3} lg={3} key={index}>
                    <img
                      src={`/images/${imageName}`} // Path to the SVG image
                      alt={`Image ${index + 1}`} // Alt text for accessibility
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        display: "block",
                      }} // Style to ensure the image fits within the grid item
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",

                    backgroundColor: currentPage === 1 ? "black" : "white",
                    border: "1px solid black",
                    marginRight: "5px",
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",

                    backgroundColor: currentPage === 2 ? "black" : "white",
                    border: "1px solid black",
                  }}
                ></Box>
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
                <CustomButton onClick={onClose}>ADD STAFF MEMBER</CustomButton>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default NewStaffmemberModal;
