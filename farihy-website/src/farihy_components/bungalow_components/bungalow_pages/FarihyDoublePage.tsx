import React from "react";
// Imports Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Imports Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import {
  VillaCard,
  SuiteCard,
  DuplexCard,
  DoubleCard,
  FamilialeCard,
} from "../../../components/RoomCard";
import { GalleryImage } from "../../../components/LargePictureGallery";

// --- Interfaces ---
interface PresentationSection {
  imageSrc: string;
  reversed: boolean;
  text: string[];
  details?: {
    price: string;
    checkIn: string;
  };
}

// --- Composant Local : Gestion Responsive (Swiper Mobile / Grille Desktop) ---
const OtherRoomsSuggestions = () => {
  // Liste des chambres à afficher (On exclut la Familiale)
  const rooms = [
    { id: "familiale", Component: FamilialeCard },
    { id: "suite", Component: SuiteCard },
    { id: "duplex", Component: DuplexCard },
    { id: "villa", Component: VillaCard },
  ];

  return (
    <div>
      {/* --- VUE MOBILE : SWIPER (Visible seulement sur petit écran) --- */}
      {/* Note: 'd-md-none' est une classe Bootstrap qui cache l'élément sur medium screens et + */}
      <div className="d-block d-md-none">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.15} // Affiche un bout de la carte suivante pour inciter au swipe
          centeredSlides={true}
          loop={false}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {rooms.map((item) => (
            <SwiperSlide key={item.id} style={{ height: "auto" }}>
              <item.Component />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- VUE DESKTOP : GRILLE (Visible seulement sur grand écran) --- */}
      {/* Note: 'd-none d-md-grid' cache sur mobile, affiche en grid sur desktop */}
      <div
        className="d-none d-md-grid"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)", // Force 4 colonnes
          gap: "20px",
        }}
      >
        {rooms.map((item) => (
          <div key={item.id}>
            <item.Component />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Page Principale ---
const FarihyDoublePage = () => {
  const basePath = "/src/assets/pictures/double/";

  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.webp" },
    { src: basePath + "2.webp" },
    { src: basePath + "3.webp" },
    { src: basePath + "4.webp" },
    { src: basePath + "5.webp" },

    { src: basePath + "ext.webp" },
  ];

  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "1.webp",
      reversed: true,
      text: [
        "Idéal pour les personnes seules ou les couples, nos trois bungalows doubles disposent d’un lit Queen-size,  d’une salle de bains et d’une terrasse privative.",
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI.",
        "Profitez d’une vue directe sur le lac Itasy depuis votre bungalow.",
      ],
      details: {
        price: "Tarif hors petit-déjeuner : 400.000 Ariary la nuit",
        checkIn: "Check-in : 13h00 - Check-out : 11h00",
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "ext.webp"}
      pageTitle="Les Doubles"
      contentSections={pageSections}
      galleryTitle="Aperçu des doubles"
      galleryImages={bungalowImages}
      // Injection du composant créé ci-dessus
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyDoublePage;
