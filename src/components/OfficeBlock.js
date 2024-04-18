import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreateIcon from "@mui/icons-material/Create";
// import Members from "./images/members.svg";

const OfficeBlock = ({
  heading,
  telephone,
  email,
  officeCapacity,
  location,
  numberMembers,
  handleClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAccordionClick = (event) => {
    // Stop event propagation to prevent it from triggering onClick of the parent Box
    event.stopPropagation();
  };

  const handleCreateIconClick = (event) => {
    // Stop event propagation to prevent it from triggering onClick of the parent Box
    event.stopPropagation();
    handleClick();
    console.log("pencil clicked");
    // Additional logic for CreateIcon click if needed
  };

  return (
    <Box>
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <Typography variant="h4">{heading}</Typography>
          <CreateIcon onClick={handleCreateIconClick} cursor="pointer" />
        </Grid>
        <br />
        <Grid
          container
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img
            src={window.location.origin + "/images/members.svg"}
            alt="members svg"
          />
          <Typography variant="h6">
            {numberMembers} Staff Members in Office
          </Typography>
        </Grid>
      </Grid>
      <Accordion
        expanded={expanded}
        onChange={handleExpand}
        onClick={handleAccordionClick}
        sx={{ borderTop: "1px solid black" }}
      >
        <AccordionSummary sx={{ justifyContent: "center" }}>
          <Typography>More info</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Your other content */}
            <ExpandMoreIcon />
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box display="flex" flexDirection="column" width="100%">
            <Box
              display="flex"
              alignItems="center"
              paddingBottom="10px"
              sx={{ gap: 1 }}
            >
              <PhoneIcon />
              <Typography>{telephone}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              paddingBottom="10px"
              sx={{ gap: 1 }}
            >
              <EmailIcon />
              <Typography>{email}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              paddingBottom="10px"
              sx={{ gap: 1 }}
            >
              <BusinessIcon />
              <Typography>Office Capacity: {officeCapacity}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
              <LocationOnIcon />
              <Typography>{location}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OfficeBlock;
