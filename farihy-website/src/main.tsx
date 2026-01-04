import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import RoomCard from "./components/RoomCard";
import VerticalPicture from "./components/VerticalPicture";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="container py-4">
      {/* The Room Card */}
      <div className="mb-4">
        <RoomCard
          roomName="Les Duplex"
          minPax={1}
          maxPax={6}
          price="800 000"
          imagePath="/src/assets/couverture-bungalow-double.webp"
        />
      </div>


      <div className="col-md-6">
        <VerticalPicture
          imagePath="/src/assets/massage-tahina.png"
        />
      </div>
    </div>
  </React.StrictMode>
);
