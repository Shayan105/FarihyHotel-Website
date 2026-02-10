import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next"; // Import translation hook

import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import {
  FamilialeCard,
  SuiteCard,
  DuplexCard, // Note: Not used in suggestions since we are on the Duplex page
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
      {/* Mobile & Tablet View: Swiper 
          Visible up to XL screens (1200px) to prevent crunched cards on laptops 
      */}
      <div className="d-block d-xl-none">
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
          // Responsive breakpoints
          breakpoints={{
            576: { slidesPerView: 2, centeredSlides: false, initialSlide: 0 },
            768: { slidesPerView: 2.5, centeredSlides: false, initialSlide: 0 },
            992: { slidesPerView: 3, centeredSlides: false, initialSlide: 0 }
          }}
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

      {/* Desktop View: Grid 
          Visible only on screens larger than 1200px
      */}
      <div
        className="d-none d-xl-grid"
        style={{
          display: "grid",
          // Ensures cards are at least 300px wide
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
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

const FarihyDuplexPage = () => {
  const { t } = useTranslation(); // Initialize hook
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
        t("bungalows.duplex.description.section1.p1"),
        t("bungalows.duplex.description.section1.p2"),
        t("bungalows.duplex.description.section1.p3"),
        t("bungalows.duplex.description.section1.p4"),
      ],
    },
    {
      imageSrc: basePath + "7.webp",
      reversed: false,
      text: [
        t("bungalows.duplex.description.section2.p1"),
        t("bungalows.duplex.description.section2.p2"),
      ],
    },
    {
      imageSrc: basePath + "10.webp",
      reversed: true,
      text: [
        t("bungalows.duplex.description.section3.p1"),
        t("bungalows.duplex.description.section3.p2"),
      ],
      details: {
        price: t("bungalows.duplex.details.price"),
        checkIn: t("bungalows.duplex.details.checkIn"),
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "ext.webp"}
      pageTitle={t("bungalows.duplex.title")}
      contentSections={pageSections}
      galleryTitle={t("bungalows.duplex.gallery_title")}
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihyDuplexPage;