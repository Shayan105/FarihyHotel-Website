import React from "react";
// Imports Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Imports Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import {
  FamilialeCard,
  SuiteCard,
  DuplexCard,
  DoubleCard,
  VillaCard,
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
    { id: "double", Component: DoubleCard },
    { id: "villa", Component: VillaCard },
    { id: "duplex", Component: DuplexCard },
    { id: "familial", Component: FamilialeCard },
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
          loop={true}
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
const FarihySuitePage = () => {
  const basePath = "/src/assets/pictures/suite/";

  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.webp" },
    { src: basePath + "2.webp" },
    { src: basePath + "3.webp" },
    { src: basePath + "4.webp" },
    { src: basePath + "5.webp" },
    { src: basePath + "6.webp" },
    { src: basePath + "ext.webp" },
  ];

  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "2.webp",
      reversed: true,
      text: [
        "Cette suite de 80 m² , idéale pour un couple, un groupe d’amis ou une famille jusqu’à 5 personnes",
        "Elle se compose de deux chambres communicantes.",
        "La chambre principale est équipée d’un lit Queen-size et dispose de sa propre salle de bains.",
        "La seconde chambre est modulable, avec trois lits simples ou un lit double et un lit simple, et comprend également une salle de bains.",
        "Les équipements incluent la ventilation, une télévision et une connexion WIFI."
      ],
    },
    {
      imageSrc: basePath + "1.webp",
      reversed: false,
      text: [
        "La suite bénéficie d’une terrasse privée donnant sur le lac, d’une piscine privée ainsi que d’un jacuzzi*, pour des moments de détente privilégiés.",
        
      ],
      details: {
        price: "Tarif hors petit-déjeuner : 750.000 Ariary la nuit",
        checkIn: "Check-in : 13h00 - Check-out : 11h00",
        addText: "*Pour des raisons énergétiques, le jacuzzi peut être utilisé 30 minutes par jour entre 8h00 et 19h00"
      },
    },


  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "6.webp"}
      pageTitle="La Suite"
      contentSections={pageSections}
      galleryTitle="Aperçu de la Suite"
      galleryImages={bungalowImages}
      // Injection du composant créé ci-dessus
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihySuitePage;
