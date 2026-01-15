import React from "react";
// Imports Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Imports Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import { VillaCard, SuiteCard, DuplexCard, DoubleCard } from "../../../components/RoomCard";
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
  // Liste des chambres à afficher
  const rooms = [
    { id: 'double', Component: DoubleCard },
    { id: 'suite', Component: SuiteCard },
    { id: 'duplex', Component: DuplexCard },
    { id: 'villa', Component: VillaCard },
  ];

  return (
    <div>
      {/* --- VUE MOBILE : SWIPER --- */}
      <div className="d-block d-md-none" style={{ paddingBottom: '30px' }}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={15}
          slidesPerView={1.2} // Show slightly more of the next card
          centeredSlides={true}
          pagination={{ clickable: true }}
          grabCursor={true}
          // Fix for "buggy" feel: Disable loop and enable touch settings
          loop={false} 
          touchStartPreventDefault={false} 
          style={{ overflow: 'visible' }} // Allows shadows not to be cut off
        >
          {rooms.map((item) => (
            <SwiperSlide key={item.id} style={{ height: 'auto', display: 'flex' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <item.Component />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- VUE DESKTOP : GRILLE --- */}
      <div 
        className="d-none d-md-grid" 
        style={{ 
          gridTemplateColumns: 'repeat(4, 1fr)', 
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
    { src: basePath + "1.webp" },
    { src: basePath + "2.webp" },
    { src: basePath + "3.webp" },
    { src: basePath + "4.webp" },
    { src: basePath + "out.webp" },
    { src: basePath + "ext.webp" },
  ];

  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "ext.webp",
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
      headerImageSrc={basePath + "out.webp"}
      pageTitle="Bungalow familial"
      contentSections={pageSections}
      galleryTitle="Aperçu du bungalow"
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />} 
    />
  );
};

export default FarihyFamilialPage;