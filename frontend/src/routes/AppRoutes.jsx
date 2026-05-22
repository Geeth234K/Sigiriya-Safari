import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/public/Home";
import AboutSigiriya from "../pages/public/AboutSigiriya";
import WhatToDo from "../pages/public/WhatToDo";
import ContactUs from "../pages/public/ContactUs";
import Profile from "../pages/public/Profile";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSigiriya />} />
        <Route path="/activities" element={<WhatToDo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}
