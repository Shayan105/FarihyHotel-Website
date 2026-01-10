import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/index.css";

// 1. Import Router components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 2. Import Components
import FarihyHeader from "./farihy_components/presentation_page/FarihyHeader";
import FarihyFooter from "./farihy_components/presentation_page/FarihyFooter";
// 3. Import Pages
import HomePage from "./pages/HomePage";
import FarihyVillaPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyVillaPage";
import FarihySuitePage from "./farihy_components/bungalow_components/bungalow_pages/FarihySuitePage";
import FarihyDoublePage from "./farihy_components/bungalow_components/bungalow_pages/FarihyDoublePage";
import FarihyDuplexPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyDuplexPage";
import FarihyFamilialPage from "./farihy_components/bungalow_components/bungalow_pages/FarihyFamilialPage";
import FarihyReservation from "./pages/FarihyReservation";
import FarihyContact from "./pages/FarihyContact";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* HEADER (Fixe en haut) */}
      <FarihyHeader />

      {/* CONTAINER PRINCIPAL
         On utilise Flexbox pour créer un "Sticky Footer".
         Cela force le footer à rester tout en bas même si la page est vide.
      */}
      <div
        className="container-fluid p-0"
        style={{
          paddingTop: "80px",
          minHeight: "100vh", // Prend au moins toute la hauteur de l'écran
          display: "flex", // Active Flexbox
          flexDirection: "column", // Organise les éléments en colonne
        }}
      >
        {/* WRAPPER DU CONTENU (Routes) */}
        {/* flexGrow: 1 fait que cette div prend tout l'espace vide disponible */}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Room routes */}
            <Route path="/villa" element={<FarihyVillaPage />} />
            <Route path="/suite" element={<FarihySuitePage />} />
            <Route path="/double" element={<FarihyDoublePage />} />
            <Route path="/duplex" element={<FarihyDuplexPage />} />
            <Route path="/familiale" element={<FarihyFamilialPage />} />
            <Route path="/bungalows" element={<HomePage />} />
            {/*Contact Route */}
            <Route path="/contact" element={<FarihyContact />} />
            {/*Contact Route */}
            <Route path="/reservation" element={<FarihyReservation />} />
          </Routes>
        </div>

        {/* FOOTER (Sera poussé tout en bas grâce au flexGrow du contenu) */}
        <FarihyFooter />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
