import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/index.css";
import RoomCard from "./components/RoomCard";
import VerticalPicture from "./components/VerticalPicture";
import MassageGallery from "./farihy_components/MassageImageGallery";
import RestaurantGallery from "./farihy_components/RestaurantImageGallery";
import CuisineGallery from "./farihy_components/CuisineRestaurantGallery";
import PresentationCard from "./farihy_components/PresentationCard";
import FarihyBanner from "./farihy_components/FarihyBanner";
import FarihyRoomGallery from "./farihy_components/FarihyRoomGallery";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Global Wrapper: Full width, no padding */}
    <div className="container-fluid p-0">
      <FarihyBanner/>
      <PresentationCard />

      <div className="container py-5">
        <FarihyRoomGallery/>
        <RestaurantGallery />
        <CuisineGallery />
        <MassageGallery />
      </div>
    </div>
  </React.StrictMode>
);
