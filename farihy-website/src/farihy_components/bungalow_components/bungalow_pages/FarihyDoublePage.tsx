import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next"; 

import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import {
  VillaCard,
  SuiteCard,
  DuplexCard,
  DoubleCard,
  FamilialeCard,
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
    { id: "familiale", Component: FamilialeCard },
    { id: "suite", Component: SuiteCard },
    { id: "duplex", Component: DuplexCard },
    { id: "villa", Component: VillaCard },
  ];

  return (
    <div>
      <div className="d-block d-xl-none">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={false}
          initialSlide={1}
          pagination={{ clickable: true }}
          roundLengths={true}
          touchStartPreventDefault={false}
          style={{ paddingBottom: "40px" }}
        >
          {rooms.map((item) => (
            <SwiperSlide key={item.id} style={{ height: "auto", display: "flex" }}>
              <div style={{ width: "100%", display: "flex" }}>
                <item.Component style={{ flex: 1 }} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid (Visible seulement sur écrans XL > 1200px) */}
      <div
        className="d-none d-xl-grid"
        style={{
          display: "grid",
          // CORRECTION ICI : 
          // 'minmax(300px, 1fr)' garantit que les cartes font au moins 300px de large.
          // Si l'écran n'est pas assez large pour 4 cartes de 300px, il passera à 3 colonnes automatiquement.
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px", // Augmentation légère de l'espace entre les cartes
          alignItems: "stretch" 
        }}
      >
        {rooms.map((item) => (
          <div key={item.id} style={{ height: "100%" }}>
            <item.Component />
          </div>
        ))}
      </div>
    </div>
  );
};
const FarihyDoublePage = () => {
  const { t } = useTranslation();
  const basePath = "/pictures/double/";

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
        t("bungalows.doubles.description.p1"),
        t("bungalows.doubles.description.p2"),
        t("bungalows.doubles.description.p3"),
      ],
      details: {
        price: t("bungalows.doubles.details.price"),
        checkIn: t("bungalows.doubles.details.checkIn"),
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "ext.webp"}
      pageTitle={t("bungalows.doubles.title")}
      contentSections={pageSections}
      galleryTitle={t("bungalows.doubles.gallery_title")}
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyDoublePage;