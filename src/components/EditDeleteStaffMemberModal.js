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
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleEditClick = () => {
    setCurrentPage(3); // Move to the second page
  };
  const handleDeleteClick = () => {
    setCurrentPage(2); // Move to the 1st page
  };

  const handleBackPage = () => {
    setCurrentPage(1); // Move to the 1st page
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
          maxWidth: "30%", // Set maximum width for the modal
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
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditDeleteStaffMemberModal;
