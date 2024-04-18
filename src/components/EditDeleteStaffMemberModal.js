import React, { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import svgImages from "../data/SvgImages";
// Custom styling for the Button component
const CustomButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "white",
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
const CustomButtonOpposite = styled(Button)({
  backgroundColor: "white",
  color: "#007bff",
  borderRadius: "20px",
  width: "300px",
  "&:hover": {
    backgroundColor: "#808080",
  },
});

const EditDeleteStaffMemberModal = ({
  isOpen,
  onClose,
  onDeleteMember,
  currentMember,
  handleModalClose,
  onUpdateMember,
  selectedMemberIcon,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  console.log("currentMember", currentMember);
  useEffect(() => {
    // Split the full name and set first and last names in state
    const [first, last] = currentMember.split(" ");
    setFirstName(first);
    setLastName(last);
    setSelectedAvatar(selectedMemberIcon);
  }, [currentMember, selectedMemberIcon]);

  const handleUpdateMember = () => {
    // Check if all required fields are filled
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      selectedAvatar === null
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Edit member object
    const editedMember = {
      name: `${firstName} ${lastName}`,
      icon: selectedAvatar,
    };

    // Pass new member data to parent component
    onUpdateMember(editedMember);

    // Clear input fields
    setFirstName("");
    setLastName("");
    setSelectedAvatar(null);

    // Close the modal
    onClose();
    //set modal page to one
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(4); // Move to the second page
  };

  const handleEditClick = () => {
    setCurrentPage(3); // Move to the second page
  };
  const handleDeleteClick = () => {
    setCurrentPage(2); // Move to the 1st page
  };

  const handleBackPage = () => {
    setCurrentPage(1); // Move to the 1st page
  };
  const handleBackEditPage = () => {
    setCurrentPage(3); // Move to the 1st page
  };

  const handleBackdropClick = () => {
    setCurrentPage(1);
    onClose(); // Close the modal
  };

  const handlDeleteMember = () => {
    // Pass new member data to parent component
    onDeleteMember(currentMember);

    // Close the modal
    onClose();
    //set modal page to one
    setCurrentPage(1);
  };

  return (
    <Modal
      className="main-container"
      open={isOpen}
      onClose={onClose}
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
          maxWidth: "40%", // Set maximum width for the modal
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {currentPage === 1 && (
            <>
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
                <CustomButton onClick={handleEditClick}>
                  EDIT STAFF MEMBER
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
                <CustomButtonOpposite onClick={handleDeleteClick}>
                  DELETE STAFF MEMBER
                </CustomButtonOpposite>
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
                  <Typography variant="h5">
                    Are You Sure You Want To Delete Staff Member?
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
                <CustomButtonDel onClick={handlDeleteMember}>
                  DELETE MEMBER
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
                  KEEP MEMBER
                </CustomButtonOpposite>
              </Grid>
            </>
          )}

          {currentPage === 3 && (
            <>
              <Grid container item xs={12}>
                <Grid item xs={6} display="inline-flex">
                  <Typography variant="h5">Edit Staff Member</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <HighlightOffIcon
                    onClick={() => {
                      onClose();
                      handleModalClose();
                      setCurrentPage(1);
                    }}
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    sx={{ display: "block" }}
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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

                    backgroundColor: currentPage === 3 ? "black" : "white",
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

                    backgroundColor: currentPage === 4 ? "black" : "white",
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
          {currentPage === 4 && (
            <>
              <Grid container item xs={12} alignItems="center">
                <Grid item xs={9} display="inline-flex">
                  <ArrowBackIcon
                    onClick={handleBackEditPage}
                    sx={{ cursor: "pointer" }}
                  />
                  <Typography variant="h5">Edit Staff Member</Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="flex-end">
                  <HighlightOffIcon
                    onClick={() => {
                      onClose();
                      handleModalClose();
                      setCurrentPage(1);
                    }}
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
                {Object.values(svgImages).map((imageName, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={3}
                    md={3}
                    lg={3}
                    key={index}
                    sx={{ cursor: "pointer" }}
                    onClick={() => setSelectedAvatar(imageName.value)}
                  >
                    <img
                      src={imageName.value} // Path to the SVG image
                      alt={imageName.label} // Alt text for accessibility
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: "50%",
                        border:
                          selectedAvatar === imageName.value
                            ? "3px solid black"
                            : "",
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

                    backgroundColor: currentPage === 3 ? "black" : "white",
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

                    backgroundColor: currentPage === 4 ? "black" : "white",
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
                <CustomButton onClick={handleUpdateMember}>
                  UPDATE STAFF MEMBER
                </CustomButton>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditDeleteStaffMemberModal;
