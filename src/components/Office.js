import React, { useState } from "react";
import OfficeBlock from "./OfficeBlock";
import { Typography, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import companyDetails from "../data/CompanyData"; // Adjust the path as needed
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import NewStaffmemberModal from "./NewStaffmemberModal";
// import EditOffice from "./EditOffice";
import EditDeleteStaffMemberModal from "./EditDeleteStaffMemberModal";

const Office = () => {
  const { companyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [members, setMembers] = useState(companyDetails[companyId].members);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedMemberIcon, setSelectedMemberIcon] = useState(null);
  console.log("selectedMember", selectedMember);
  const handleModalClose = () => {
    // Reset the selectedAvatar state to null when the modal is closed
    setSelectedAvatar(null);
  };

  const handleHomeButton = (companyId) => {
    navigate(`/`);
  };
  const handleAddMember = (newMember) => {
    // Add new member to the list
    // Update the members array of the corresponding company using companyId
    companyDetails[companyId].members.push(newMember);
    setMembers([...members, newMember]);
  };

  const handleDeleteMember = (delMember) => {
    const updatedMembers = members.filter(
      (member) => member.name !== delMember
    );

    companyDetails[companyId].members = updatedMembers;

    setMembers(updatedMembers);
  };

  const handleUpdateMember = (editedMember) => {
    // Get the members array of the corresponding company using companyId
    const companyMembers = companyDetails[companyId].members;
    // Find the index of the member to be updated in the members array
    const index = companyMembers.findIndex(
      (member) => member.name === selectedMember
    );
    // If the member is found, update its details
    if (index !== -1) {
      // Update the member's details
      companyMembers[index] = editedMember;
      // Update the companyDetails object with the updated members list
      companyDetails[companyId].members = [...companyMembers];
      // Update the state with the updated members list
      setMembers([...companyMembers]);
    } else {
      // Member not found, handle error or log a message
      console.error("Member not found:", editedMember.name);
    }
  };

  // Use companyId to retrieve company details from companyData
  const selectedCompany = companyDetails && companyDetails[companyId];
  return (
    <Box sx={{ padding: "30px" }}>
      <Grid container item xs={12} alignItems="center">
        <Grid item xs={6} display="inline-flex">
          <ArrowBackIcon
            onClick={handleHomeButton}
            sx={{ cursor: "pointer" }}
          />
        </Grid>
        <Grid item xs={6} justifyContent="flex-end">
          <Typography variant="h5">Office</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          borderLeft: `6px solid ${selectedCompany.color}`, // Adjust the color and thickness as needed
          paddingLeft: 2, // Add some padding to separate the content from the border
          marginBottom: 2, // Add some margin bottom between boxes
          borderRadius: "8px", // Curve the sides
          margin: "10px", // Add space around the outside of the box
        }}
      >
        <OfficeBlock
          heading={selectedCompany.heading}
          telephone={selectedCompany.telephone}
          email={selectedCompany.email}
          officeCapacity={selectedCompany.officeCapacity}
          location={selectedCompany.location}
          numberMembers={selectedCompany.members.length}
        />
      </Box>
      <Grid>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          //   popupIcon={<SearchIcon sx={{ transform: 'none'}}/>}
          options={selectedCompany.members.map((member) => member.name)}
          sx={{ width: "100%", marginBottom: "10px" }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          onChange={(event, value) => {
            if (value) {
              // Find the selected member object
              setSelectedMemberIcon(
                selectedCompany.members.find((member) => member.name === value)
                  .icon
              );
              // Perform action when an option is selected
              openEditModal();
              setSelectedMember(value);
              console.log("Option selected:", value);
            }
          }}
        />
      </Grid>
      <Grid container item xs={12} alignItems="center">
        <Grid item xs={6} display="inline-flex">
          <Typography variant="h4">Staff Members In Office</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Typography variant="h4">{selectedCompany.members.length}</Typography>
        </Grid>
      </Grid>
      {selectedCompany.members.map((member) => (
        <Grid container alignItems="center">
          {/* Left-aligned icons */}
          <Grid
            item
            xs={6}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              padding: "5px",
            }}
          >
            <img src={member.icon} alt="members svg" />
            <Typography variant="h6">{member.name}</Typography>
          </Grid>

          {/* Right-aligned icons */}
          <Grid item xs={6} container justifyContent="flex-end">
            <MoreVertIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                openEditModal();
                setSelectedMember(member.name);
                setSelectedMemberIcon(member.icon);
                console.log("3 dotsButton clicked!");
              }}
            />
          </Grid>
        </Grid>
      ))}
      <AddCircleIcon
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          fontSize: 70, // Adjust the size of the icon as needed
          cursor: "pointer", // Show pointer cursor on hover
        }}
        onClick={() => {
          openModal();
          console.log("Button clicked!");
        }}
      />
      <NewStaffmemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleModalClose={handleModalClose}
        onAddMember={handleAddMember}
      />
      <EditDeleteStaffMemberModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onDeleteMember={handleDeleteMember}
        onUpdateMember={handleUpdateMember}
        handleModalClose={handleModalClose}
        currentMember={selectedMember}
        selectedMemberIcon={selectedMemberIcon}
      />
    </Box>
  );
};

export default Office;
