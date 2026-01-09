import React from "react";
// Imports Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Imports Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import FarihyRoomPageTemplate from "./FarihyRoomPageTemplate";
import { VillaCard, SuiteCard, DuplexCard, DoubleCard } from "../../components/RoomCard";
import { GalleryImage } from "../../components/LargePictureGallery";

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
    { id: 'double', Component: DoubleCard },
    { id: 'suite', Component: SuiteCard },
    { id: 'duplex', Component: DuplexCard },
    { id: 'villa', Component: VillaCard },
  ];

  return (
    <div>
      <h3 className="mb-4" style={{ fontFamily: 'serif', color: '#5C3D2E' }}>
        Découvrir nos autres hébergements
      </h3>

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
            <SwiperSlide key={item.id} style={{ height: 'auto' }}>
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
          gridTemplateColumns: 'repeat(4, 1fr)', // Force 4 colonnes
          gap: '20px' 
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
const FarihyFamilialPage = () => {
  const basePath = "/src/assets/pictures/familiale/";

  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.jpg" },
    { src: basePath + "2.jpg" },
    { src: basePath + "3.jpg" },
    { src: basePath + "4.jpg" },
    { src: basePath + "out.jpg" },
    { src: basePath + "ext.jpg" },
  ];

  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "ext.jpg",
      reversed: true,
      text: [
        "Idéal pour un groupe d’amis ou une famille, nos quatre bungalows familiaux disposent de deux grands lit Queen-size et d’un petit lit, d’une salle de bains et d’une petite terrasse.",
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI."
      ],
      details: {
        price: "Tarif hors petit-déjeuner : 425.000 Ariary la nuit",
        checkIn: "Check-in : 13h00 - Check-out : 11h00",
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "out.jpg"}
      pageTitle="Bungalow familial"
      
      contentSections={pageSections}
      
      galleryTitle="Aperçu du bungalow"
      galleryImages={bungalowImages}
      
      // Injection du composant créé ci-dessus
      otherRoomsComponent={<OtherRoomsSuggestions />} 
    />
  );
};

export default FarihyFamilialPage;