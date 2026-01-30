import React from "react";
import FarihyBanner from "../farihy_components/presentation_page/FarihyBanner"; 
import FarihyPopupNotification from "../farihy_components/presentation_page/FarihyPopupNotification";
import CuisineGallery from "../farihy_components/presentation_page/CuisineRestaurantGallery";
import FarihyLocation from "../farihy_components/presentation_page/FarihyLocation";
import FarihyRoomGallery from "../farihy_components/presentation_page/FarihyRoomGallery";
import MassageGallery from "../farihy_components/presentation_page/MassageImageGallery";
import PresentationCard from "../farihy_components/presentation_page/PresentationCard";
import RestaurantGallery from "../farihy_components/presentation_page/RestaurantImageGallery";

const HomePage = () => {
  return (
    <>
      {/* Logic-based Notification */}
      <FarihyPopupNotification />

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