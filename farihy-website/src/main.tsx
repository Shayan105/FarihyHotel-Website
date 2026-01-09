import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css"; 
import "./assets/css/index.css"; 

// 1. Import Router components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FarihyHeader from "./farihy_components/presentation_page/FarihyHeader";
import HomePage from "./pages/HomePage";
import FarihyVillaPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyVillaPage";
import FarihySuitePage from "./farihy_components/bungalow_components/bungalow_pages/FarihySuitePage";
import FarihyDoublePage from "./farihy_components/bungalow_components/bungalow_pages/FarihyDoublePage";
import FarihyDuplexPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyDuplexPage";
import FarihyFamilialPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyFamilialPage";

// 2. Import your Layout/Header and Pages



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 3. Wrap everything in BrowserRouter */}
    <BrowserRouter>
      
      {/* Header is outside Routes so it stays visible on ALL pages */}
      <FarihyHeader />

      {/* Add padding because Header is fixed-top */}
      <div className="container-fluid p-0" style={{ paddingTop: "80px" }}>
        
        {/* 4. Define your Routes */}
        <Routes>
          {/* When URL is /, show HomePage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Room routes*/}
          <Route path="/villa" element={<FarihyVillaPage />} />
          <Route path="/suite" element={<FarihySuitePage />} />
          <Route path="/double" element={<FarihyDoublePage />} />
          <Route path="/duplex" element={<FarihyDuplexPage />} />
          <Route path="/familiale" element={<FarihyFamilialPage />} />
          
          {/* You can map /bungalows to HomePage too, or a specific BungalowPage */}
          <Route path="/bungalows" element={<HomePage />} />
        </Routes>

      </div>
    </BrowserRouter>
  </React.StrictMode>
);