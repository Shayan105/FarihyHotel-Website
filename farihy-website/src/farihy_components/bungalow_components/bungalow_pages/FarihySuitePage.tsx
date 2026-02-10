import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next"; // Import translation hook

import "swiper/css";
import "swiper/css/pagination";

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
    addText?: string;
  };
}

const ROOMS_DATA = [
  { id: "double", Component: DoubleCard },
  { id: "villa", Component: VillaCard },
  { id: "duplex", Component: DuplexCard },
  { id: "familial", Component: FamilialeCard },
];

const OtherRoomsSuggestions = () => {
  return (
    <div>
      {/* Mobile View: Swiper Slider */}
      <div className="d-block d-md-none">
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
          {ROOMS_DATA.map((item) => (
            <SwiperSlide key={item.id}>
              <item.Component />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View: Grid Layout */}
      <div
        className="d-none d-md-grid"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {ROOMS_DATA.map((item) => (
          <div key={item.id}>
            <item.Component />
          </div>
        ))}
      </div>
    </div>
  );
};

const FarihySuitePage = () => {
  const { t } = useTranslation(); // Initialize hook
  const basePath = "/pictures/suite/";

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
        t("bungalows.suite.description.section1.p1"),
        t("bungalows.suite.description.section1.p2"),
        t("bungalows.suite.description.section1.p3"),
        t("bungalows.suite.description.section1.p4"),
        t("bungalows.suite.description.section1.p5"),
      ],
    },
    {
      imageSrc: basePath + "1.webp",
      reversed: false,
      text: [
        t("bungalows.suite.description.section2.p1"),
      ],
      details: {
        price: t("bungalows.suite.details.price"),
        checkIn: t("bungalows.suite.details.checkIn"),
        addText: t("bungalows.suite.details.addText"),
      },
    },
  ];

  return (
    <FarihyRoomPageTemplate
      headerImageSrc={basePath + "6.webp"}
      pageTitle={t("bungalows.suite.title")}
      contentSections={pageSections}
      galleryTitle={t("bungalows.suite.gallery_title")}
      galleryImages={bungalowImages}
      otherRoomsComponent={<OtherRoomsSuggestions />}
    />
  );
};

export default FarihySuitePage;