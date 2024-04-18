import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../navigation/NavBar";
import Office from "../components/Office";
// import EditOffice from "../components/EditOffice";
// import AddOffice from "../components/AddOffice";

const RoutesFunc = () => {
  return (
    <Router basename="/office-spaces">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/office/:companyId" element={<Office />} />
        {/* <Route exact path="/edit_office" element={<EditOffice />} />
        <Route exact path="/add_office" element={<AddOffice />} /> */}
      </Routes>
    </Router>
  );
};

export default RoutesFunc;
