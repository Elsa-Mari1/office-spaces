import React, { useState, useEffect } from "react";
import OfficeBlock from "./OfficeBlock";
import { Typography, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
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

const CustomButtonOpposite = styled(Button)({
  backgroundColor: "white",
  color: "#007bff",
  borderRadius: "20px",
  width: "300px",
  "&:hover": {
    backgroundColor: "#808080",
  },
});

const CustomButtonDel = styled(Button)({
  backgroundColor: "red", // Example background color
  color: "white", // Example text color
  borderRadius: "20px", // Set the border radius
  width: "300px", // Set the width
  "&:hover": {
    backgroundColor: "#808080", // Example hover background color
  },
});

const EditOffice = ({
  isOpen,
  onClose,
  onUpdateOffice,
  officeData,
  onDeleteOffice,
}) => {
  const [officeName, setOfficeName] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmationModal = () => setIsConfirmationOpen(true);
  const closeConfirmationModal = () => setIsConfirmationOpen(false);
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [listMembers, setListMembers] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleHomeButton = () => {
    onClose();
  };
  console.log("officeData hier", officeData);

  const handleBackPage = () => {
    // setCurrentPage(1); // Move to the 1st page
    closeConfirmationModal();
  };

  // const handleNextPage = () => {
  //   // setCurrentPage(2); // Move to the second page
  //   openModal();
  // };

  const handleBackdropClick = () => {
    // setCurrentPage(1);
    onClose(); // Close the modal
    closeConfirmationModal();
  };

  const handleDeleteOffice = () => {
    // Pass new member data to parent component
    // onDeleteOffice(officeData);
    openConfirmationModal();

    // Close the modal
    // onClose();
    //set modal page to one
    // onClose()
  };
  const handleDeleteOfficeFinal = () => {
    // Pass the current office data to the parent component for deletion
    onDeleteOffice(officeData);

    // Close the modal and the confirmation modal
    onClose();
    closeConfirmationModal();
  };

  useEffect(() => {
    setOfficeName(officeData.heading);
    setPhysicalAddress(officeData.location);
    setEmailAddress(officeData.email);
    setPhoneNumber(officeData.telephone);
    setMaxCapacity(officeData.officeCapacity);
    setSelectedColor(officeData.color);
    setListMembers(officeData.members);
  }, [officeData]);

  const handleUpdateOffice = () => {
    // Validate input fields
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

    // Prepare updated office data with id included
    const updatedOffice = {
      heading: officeName,
      location: physicalAddress,
      email: emailAddress,
      telephone: phoneNumber,
      officeCapacity: Number(maxCapacity),
      color: selectedColor,
      members: officeData.members, // Ensure members data is preserved
    };
    console.log("updatedOffice", updatedOffice);
    // Pass updated office data to the parent component
    onUpdateOffice(updatedOffice);

    // Close the modal
    onClose();
  };

  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        className="main-container"
      >
        <Box sx={{ padding: "30px" }}>
          {/* {currentPage === 1 && (
          <> */}
          <Grid container item xs={12} alignItems="center">
            <Grid item xs={4} display="inline-flex">
              <ArrowBackIcon onClick={onClose} sx={{ cursor: "pointer" }} />
            </Grid>
            <Grid item xs={8} justifyContent="flex-end">
              <Typography variant="h5">Edit Office</Typography>
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
                xs={3}
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
                      selectedColor === imageName.color
                        ? "3px solid black"
                        : "",
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
            <CustomButton onClick={handleUpdateOffice}>
              UPDATE OFFICE
            </CustomButton>
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
            <CustomButtonOpposite onClick={handleDeleteOffice}>
              DELETE OFFICE
            </CustomButtonOpposite>
          </Grid>
        </Box>
      </Dialog>
      <Modal
        open={isConfirmationOpen}
        onClose={closeConfirmationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            onClick: handleBackdropClick,
          },
        }}
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
            maxWidth: "80%", // Set maximum width for the modal
          }}
        >
          <Grid container item xs={12} alignItems="center">
            <Grid item xs={9} display="inline-flex">
              <ArrowBackIcon
                onClick={handleBackPage}
                sx={{ cursor: "pointer" }}
              />
              <Typography variant="h5">
                Are You Sure You Want To Delete Office?
              </Typography>
            </Grid>
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
            <CustomButtonDel onClick={handleDeleteOfficeFinal}>
              DELETE OFFICE
            </CustomButtonDel>
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
            <CustomButtonOpposite onClick={handleBackdropClick}>
              KEEP OFFICE
            </CustomButtonOpposite>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default EditOffice;
