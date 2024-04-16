import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Grid from "@mui/material/Grid";

const NavBar = () => {
  const [currentHour, setCurrentHour] = useState("");

  useEffect(() => {
    // Update the current hour every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentHour(
        now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0")
      );
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          width: "100%",
          minHeight: "60px",
          height: "20px",
        }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            {/* Left-aligned icons */}
            <Grid item xs={6} sx={{ display: "inline-flex" }}>
              <Typography>{currentHour}</Typography>
              <ChatIcon />
            </Grid>

            {/* Right-aligned icons */}
            <Grid item xs={6} container justifyContent="flex-end">
              <VolumeDownIcon />
              <LocationOnIcon />
              <PhoneInTalkIcon />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
