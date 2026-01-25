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
    { id: "suite", Component: SuiteCard },
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
const FarihyVillaPage = () => {
  const basePath = "/pictures/villa/";

  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.webp" },
    { src: basePath + "2.webp" },
    { src: basePath + "3.webp" },
    { src: basePath + "4.webp" },
    { src: basePath + "5.webp" },
    { src: basePath + "6.webp" },
    { src: basePath + "7.webp" },
    { src: basePath + "8.webp" },
    { src: basePath + "9.webp" },
    { src: basePath + "ext.webp" },
  ];

  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "8.webp",
      reversed: true,
      text: [
        "La Villa spacieuse de 200 m² offre une vue imprenable sur le lac Itasy depuis ses deux balcons.",
        "Elle est idéale pour les grandes familles et peut accueillir jusqu’à 10 personnes.",
        "Au rez-de-chaussée, elle dispose de deux chambres :  une double et une triple.  Deux salles de bains, dont l’une est équipée d’une grande baignoire ainsi que d’une douche à l’italienne.",
        "Un confortable coin salon complète cet espace.",
      ],
    },
    {
      imageSrc: basePath + "2.webp",
      reversed: false,
      text: [
        "À l’étage, deux chambres communicantes sont aménagées : une chambre triple et une chambre double, avec deux salles de bains, dont l’une comprend également une baignoire.",
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI."
      ],
    },
    {
      imageSrc: basePath + "9.webp",
      reversed: true,
      text: [
        "La villa bénéficie par ailleurs d’une vaste terrasse ombragée donnant sur la piscine et le jacuzzi, idéale pour des moments de détente en toute sérénité.",
      ],
      details: {
        price: "Tarif hors petit-déjeuner : 1.750.000 Ariary la nuit",
        checkIn: "Check-in : 14h00 - Check-out : 14h00",
      },
    },


  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "ext.webp"}
      pageTitle="La Villa"
      contentSections={pageSections}
      galleryTitle="Aperçu de la Villa"
      galleryImages={bungalowImages}
      // Injection du composant créé ci-dessus
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyVillaPage;
