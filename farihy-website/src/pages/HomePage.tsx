import React from "react";
import CuisineGallery from "../farihy_components/presentation_page/CuisineRestaurantGallery";
import FarihyRoomGallery from "../farihy_components/presentation_page/FarihyRoomGallery";
import MassageGallery from "../farihy_components/presentation_page/MassageImageGallery";
import PresentationCard from "../farihy_components/presentation_page/PresentationCard";
import RestaurantGallery from "../farihy_components/presentation_page/RestaurantImageGallery";
import FarihyLocation from "../farihy_components/presentation_page/FarihyLocation";

// 1. Import the new Banner component
// (Ensure the file path matches where you saved the banner code)
import FarihyBanner from "../farihy_components/presentation_page/FarihyBanner"; 

const HomePage = () => {
  return (
    <>
      {/* 2. Place the Banner at the very top */}
      {/* The auto-scroll logic in the banner will smoothly scroll down to the PresentationCard */}
      <FarihyBanner />

      <PresentationCard />
      <FarihyRoomGallery />
      
      <div className="container py-5">
        <RestaurantGallery />
        <CuisineGallery />
        <MassageGallery />
      </div>

      <FarihyLocation />
    </>
  );
};

export default HomePage;