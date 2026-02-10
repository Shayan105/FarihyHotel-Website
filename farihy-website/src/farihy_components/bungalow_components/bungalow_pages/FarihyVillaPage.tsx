import React from "react";
// Imports Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Imports Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next"; // Import translation hook

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
  const { t } = useTranslation(); // Initialize hook
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
        t("bungalows.villa.description.section1.p1"),
        t("bungalows.villa.description.section1.p2"),
        t("bungalows.villa.description.section1.p3"),
        t("bungalows.villa.description.section1.p4"),
      ],
    },
    {
      imageSrc: basePath + "2.webp",
      reversed: false,
      text: [
        t("bungalows.villa.description.section2.p1"),
        t("bungalows.villa.description.section2.p2"),
      ],
    },
    {
      imageSrc: basePath + "9.webp",
      reversed: true,
      text: [t("bungalows.villa.description.section3.p1")],
      details: {
        price: t("bungalows.villa.details.price"),
        checkIn: t("bungalows.villa.details.checkIn"),
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "ext.webp"}
      pageTitle={t("bungalows.villa.title")}
      contentSections={pageSections}
      galleryTitle={t("bungalows.villa.gallery_title")}
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyVillaPage;
