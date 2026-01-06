import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css"; 
import "./assets/css/index.css"; // <--- Import your custom CSS here
import RoomCard from "./components/RoomCard";
import VerticalPicture from "./components/VerticalPicture";
import MassageGallery from "./farihy_components/MassageImageGallery";
import RestaurantGallery from "./farihy_components/RestaurantImageGallery";
import CuisineGallery from "./farihy_components/CuisineRestaurantGallery";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="container py-4">
      <RestaurantGallery/>
      <CuisineGallery/> 
      <MassageGallery/>
    </div>
  </React.StrictMode>
);