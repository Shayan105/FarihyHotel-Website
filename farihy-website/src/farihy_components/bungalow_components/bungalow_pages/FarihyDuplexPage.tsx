import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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

interface PresentationSection {
  imageSrc: string;
  reversed: boolean;
  text: string[];
  details?: {
    price: string;
    checkIn: string;
  };
}

const OtherRoomsSuggestions = () => {
  const rooms = [
    { id: "double", Component: DoubleCard },
    { id: "villa", Component: VillaCard },
    { id: "suite", Component: SuiteCard },
    { id: "familial", Component: FamilialeCard },
  ];

  return (
    <div>
      {/* Mobile View: Swiper */}
      <div className="d-block d-md-none">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={false}
          initialSlide={1}
          pagination={{ clickable: true }}
          
          // Stability fixes to prevent page jumping
          roundLengths={true}
          touchStartPreventDefault={false}
          style={{ paddingBottom: "40px" }}
        >
          {rooms.map((item) => (
            <SwiperSlide key={item.id}>
              <item.Component />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid */}
      <div
        className="d-none d-md-grid"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
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

const FarihyDuplexPage = () => {
  const basePath = "/pictures/duplex/";

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
      imageSrc: basePath + "1.webp",
      reversed: true,
      text: [
        "D’une superficie de 100 m², les Duplex peuvent accueillir jusqu’à 6 personnes.",
        "Deux configurations de rez-de-chaussée sont proposées : l’une avec une chambre séparée, l’autre avec un espace ouvert.",
        "Au rez-de-chaussée, une salle de bains entièrement équipée avec une douche à l’italienne.",
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI.",
      ],
    },
    {
      imageSrc: basePath + "7.webp",
      reversed: false,
      text: [
        "A l’étage, une grande chambre avec lit double et un petit coin salon.",
        "Depuis le balcon,  la vue donne sur le lac Itasy."
      ],
    },
    {
      imageSrc: basePath + "10.webp",
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
      headerImageSrc={basePath + "ext.webp"}
      pageTitle="Les Duplex"
      contentSections={pageSections}
      galleryTitle="Aperçu des Duplex"
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyDuplexPage;