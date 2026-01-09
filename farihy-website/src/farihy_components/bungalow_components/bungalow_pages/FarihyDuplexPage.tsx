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
    { id: "suite", Component: SuiteCard },
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
const FarihyDuplexPage = () => {
  const basePath = "/src/assets/pictures/duplex/";

  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.jpg" },
    { src: basePath + "2.jpg" },
    { src: basePath + "3.jpg" },
    { src: basePath + "4.jpg" },
    { src: basePath + "5.jpg" },
    { src: basePath + "6.jpg" },
    { src: basePath + "ext.jpg" },
  ];

  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "1.jpg",
      reversed: true,
      text: [
        "D’une superficie de 100 m², les Duplex peuvent accueillir jusqu’à 6 personnes.",
        "Deux configurations de rez-de-chaussée sont proposées : l’une avec une chambre séparée, l’autre avec un espace ouvert.",
        "Au rez-de-chaussée, une salle de bains entièrement équipée avec une douche à l’italienne.",
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI.",
        
      ],
    },
    {
      imageSrc: basePath + "7.jpg",
      reversed: false,
      text: [
        "A l’étage, une grande chambre avec lit double et un petit coin salon.",
        "Depuis le balcon,  la vue donne sur le lac Itasy."
      ],
    },
    {
      imageSrc: basePath + "10.jpg",
      reversed: true,
      text: [
        "Dans la salle de bains, à l’étage, une élégante baignoire en îlot offre une vue imprenable sur le lac, invitant à la détente.",
        "Chaque duplex dispose également d’une piscine et d’une terrasse privées, pour un séjour placé sous le signe du confort et de l’intimité"
            ],
      details: {
        price: "Tarif hors petit-déjeuner : 800.000 Ariary la nuit",
        checkIn: "Check-in : 13h00 - Check-out : 11h00",
      
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "ext.jpg"}
      pageTitle="Les Duplex"
      contentSections={pageSections}
      galleryTitle="Aperçu des Duplex"
      galleryImages={bungalowImages}
      // Injection du composant créé ci-dessus
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyDuplexPage;
