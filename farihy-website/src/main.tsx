import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import RoomCard from "./components/RoomCard";
import VerticalPicture from "./components/VerticalPicture";
import MassageGallery from "./farihy_components/MassageImageGallery";
import RestaurantGallery from "./farihy_components/RestaurantImageGallery";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="container py-4">
      
      {/* Passing data via props */}
      <MassageGallery/>
      <RestaurantGallery/>
 

    </div>
  </React.StrictMode>
);