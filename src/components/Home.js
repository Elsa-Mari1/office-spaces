import React, { useState, useEffect } from "react";
import OfficeBlock from "./OfficeBlock";
import { Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import companyDetails from "../data/CompanyData"; // Adjust the path as needed
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import AddOffice from "./AddOffice";
import EditOffice from "./EditOffice";

const Home = () => {
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState("");
  const [officeData, setOfficeData] = useState({
    officeName: "",
    physicalAddress: "",
    emailAddress: "",
    phoneNumber: "",
    maxCapacity: null,
    selectedColor: null,
  });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const handleClick = (companyId) => {
    // Redirect to the component with the specific company details as input
    console.log("companyId", companyId);
    navigate(`/office/${companyId}`);
  };
  console.log("data", data);
  //   console.log("data", data);
  //   console.log("Object.entries(data)", Object.entries(data));
  useEffect(() => {
    setData(companyDetails);
  }, [companyDetails]);

  // Function to show the modal
  const handleOpenModal = (companyId) => {
    // Find the company data based on the companyId
    const currentCompany = data[companyId];
    // Set the officeData state with the current company data
    setOfficeData(currentCompany);
    // Open the modal
    setModalOpen(true);
  };

  // Function to add a new office to companyDetails
  const handleAddOffice = (newOffice) => {
    const newId = Object.keys(data).length;
    console.log("newOffice", newOffice);
    console.log("newId", newId);
    data[newId] = newOffice;
    // You may need to update state if companyDetails is stored in state
    setData({ ...data, [newId]: newOffice });
  };
  console.log("currentCompanyId", currentCompanyId);
  const handleUpdateOffice = (updatedOffice) => {
    // Get the id of the office to update
    const officeId = currentCompanyId;
    console.log("officeId", officeId);
    // Check if the office with the provided id exists in the data state
    // if (data.hasOwnProperty(officeId)) {
    // Copy the current data state
    const updatedData = { ...data };
    // Update the office data using the office id as key
    console.log("updatedData", updatedData);
    console.log("updatedOffice", updatedOffice);
    console.log("updatedData[officeId]", updatedData[officeId]);
    updatedData[officeId] = updatedOffice;

    // Update the state with the updated data
    setData(updatedData);
    // } else {
    //   console.error(`Office with id ${officeId} does not exist.`);
    // }
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
          onClick={() => {
            setCurrentCompanyId(companyId);
            handleClick(companyId);
            handleOpenModal(companyId);
          }}
        >
          <OfficeBlock
            heading={company.heading}
            telephone={company.telephone}
            email={company.email}
            officeCapacity={company.officeCapacity}
            location={company.location}
            numberMembers={company.members.length}
            handleClick={() => {
              handleOpenModal(companyId);
              setCurrentCompanyId(companyId);
            }}
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
      <EditOffice
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        officeData={officeData} // Pass officeData to EditOffice
        onUpdateOffice={handleUpdateOffice}
      />
    </Box>
  );
};

export default Home;
