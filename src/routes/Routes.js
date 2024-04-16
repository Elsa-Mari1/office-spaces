import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../navigation/NavBar";
import Office from "../components/Office";
// import Contact from "../components/Contact";
// import Gallery from "../components/Gallery";
// import Services from "../components/Services";
// import Staff from "../components/Staff";

const RoutesFunc = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/office/:companyId" element={<Office />} />
        {/* <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/staff" element={<Staff />} /> */}
      </Routes>
    </Router>
  );
};

export default RoutesFunc;
