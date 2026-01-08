import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/index.css";

// Import your new Header
import FarihyHeader from "./farihy_components/FarihyHeader";
import RoomCard from "./components/RoomCard";
import FarihyBanner from "./farihy_components/FarihyBanner";
import PresentationCard from "./farihy_components/PresentationCard";
import FarihyRoomGallery from "./farihy_components/FarihyRoomGallery";
import RestaurantGallery from "./farihy_components/RestaurantImageGallery";
import CuisineGallery from "./farihy_components/CuisineRestaurantGallery";
import MassageGallery from "./farihy_components/MassageImageGallery";
import FarihyFamilialPage from "./farihy_components/bungalow_components/FamilialePictureGallery";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 1. Render the Header at the top */}
    <FarihyHeader />

    {/* 2. Main Wrapper */}
    {/* ADD paddingTop: '80px' so the content isn't hidden behind the header */}
    <div className="container-fluid p-0" style={{ paddingTop: '80px' }}>
      <FarihyFamilialPage/>
      <div className="container py-5">

      </div>
    </div>
  </React.StrictMode>
);