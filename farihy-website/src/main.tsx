import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css"; 
import "./assets/css/index.css"; 
import CuisineGallery from "./farihy_components/presentation_page/CuisineRestaurantGallery";
import FarihyRoomGallery from "./farihy_components/presentation_page/FarihyRoomGallery";
import MassageGallery from "./farihy_components/presentation_page/MassageImageGallery";
import PresentationCard from "./farihy_components/presentation_page/PresentationCard";
import RestaurantGallery from "./farihy_components/presentation_page/RestaurantImageGallery";



// 1. Import the Header
import FarihyHeader from "./farihy_components/presentation_page/FarihyHeader";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 2. Render the Header at the top */}
    <FarihyHeader />

    {/* 3. Add paddingTop: "80px" 
        Because the header is fixed, we need to push the content down 
        by the exact height of the header (80px) so it is not hidden.
    */}
    <div className="container-fluid p-0" style={{ paddingTop: "80px" }}>
      
      <PresentationCard/>

      <FarihyRoomGallery />

      <div className="container py-5">
        <RestaurantGallery/>
        <CuisineGallery/> 
        <MassageGallery/>
      </div>

    </div>
  </React.StrictMode>
);