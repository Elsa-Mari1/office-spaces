import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RoutesFunc from "./routes/Routes";
import { ThemeProvider, styled, createTheme } from "@mui/material";
import { appTheme } from "./themes/theme";

const App = () => {
  return (
    // <ThemeProvider theme={appTheme}>
    <Box className="main-container">
      <RoutesFunc />
    </Box>
    // {/* </ThemeProvider> */}
  );
};

export default App;
