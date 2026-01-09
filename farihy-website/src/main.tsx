import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/index.css";

// Import your new Header
import FarihyDuplexPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyDuplexPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>


    {/* 2. Main Wrapper */}
    {/* ADD paddingTop: '80px' so the content isn't hidden behind the header */}
    <div className="container-fluid p-0" style={{ paddingTop: '80px' }}>
      <FarihyDuplexPage/>
      <div className="container py-5">

      </div>
    </div>
  </React.StrictMode>
);