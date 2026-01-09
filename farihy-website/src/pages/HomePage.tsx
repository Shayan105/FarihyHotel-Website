import React from "react";
import CuisineGallery from "../farihy_components/presentation_page/CuisineRestaurantGallery";
import FarihyRoomGallery from "../farihy_components/presentation_page/FarihyRoomGallery";
import MassageGallery from "../farihy_components/presentation_page/MassageImageGallery";
import PresentationCard from "../farihy_components/presentation_page/PresentationCard";
import RestaurantGallery from "../farihy_components/presentation_page/RestaurantImageGallery";

const HomePage = () => {
  return (
    <>
      <PresentationCard />
      <FarihyRoomGallery />
      <div className="container py-5">
        <RestaurantGallery />
        <CuisineGallery />
        <MassageGallery />
      </div>
    </>
  );
};

export default HomePage;