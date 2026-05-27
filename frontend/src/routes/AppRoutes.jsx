import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/public/Home";
import AboutSigiriya from "../pages/public/AboutSigiriya";
import ActivitiesPage from "../pages/public/ActivitiesPage";
import ActivityDetailPage from "../pages/public/ActivityDetailPage";
import LocalFoodDetailPage from "../pages/public/LocalFoodDetailPage";
import JeepSafariDetailPage from "../pages/public/JeepSafariDetailPage";
import ContactUs from "../pages/public/ContactUs";
import Profile from "../pages/public/Profile";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSigiriya />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetailPage />} />
        <Route path="/safaris/:id" element={<JeepSafariDetailPage />} />
        <Route path="/local-food" element={<LocalFoodDetailPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}
