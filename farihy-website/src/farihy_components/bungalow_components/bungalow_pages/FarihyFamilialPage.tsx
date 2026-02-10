import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useTranslation } from "react-i18next"; // Import translation hook

import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import { VillaCard, SuiteCard, DuplexCard, DoubleCard } from "../../../components/RoomCard";
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
    { id: 'double', Component: DoubleCard },
    { id: 'suite', Component: SuiteCard },
    { id: 'duplex', Component: DuplexCard },
    { id: 'villa', Component: VillaCard },
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

const FarihyFamilialPage = () => {
  const { t } = useTranslation(); // Initialize hook
  const basePath = "/pictures/familiale/";

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
        t("bungalows.familial.description.p1"),
        t("bungalows.familial.description.p2"),
      ],
      details: {
        price: t("bungalows.familial.details.price"),
        checkIn: t("bungalows.familial.details.checkIn"),
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "out.webp"}
      pageTitle={t("bungalows.familial.title")}
      contentSections={pageSections}
      galleryTitle={t("bungalows.familial.gallery_title")}
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />} 
    />
  );
};

export default FarihyFamilialPage;