import React from "react";
import FarihyRoomPresentationCard from "./FarihyRoomPresentationCard";
import LargePictureGallery, {
  GalleryImage,
} from "../components/LargePictureGallery";

// 1. Define the shape of a single presentation block
export interface PresentationSection {
  imageSrc?: string;
  text: string[];
  details?: {
    price?: string;
    checkIn?: string;
    restaurantHours?: string;
  };
  reversed?: boolean;
}

// 2. Update Page Props
interface RoomPageProps {
  // Global Page Info
  headerImageSrc?: string;
  pageTitle?: string;

  // Content: An array of sections instead of single fields
  contentSections: PresentationSection[]; 

  // Gallery
  galleryTitle?: string;
  galleryImages?: GalleryImage[];
}

const FarihyRoomPageTemplate: React.FC<RoomPageProps> = ({
  headerImageSrc,
  pageTitle,
  contentSections, // <--- We now receive a list
  galleryTitle = "Aperçu de la chambre",
  galleryImages,
}) => {
  
  return (
    <>
      {/* 1. HEADER (Only appears once) */}
      {headerImageSrc && (
        <div className="w-100">
          <img
            src={headerImageSrc}
            alt={pageTitle}
            className="w-100"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
      )}

      {/* 2. TITLE (Only appears once) */}
      {pageTitle && (
        <div className="container py-5 text-center">
          <h1 className="display-4" style={{ color: "#4a3728" }}>
            {pageTitle}
          </h1>
        </div>
      )}

      {/* 3. DYNAMIC CONTENT SECTIONS (Loop through the array) */}
      {contentSections.map((section, index) => (
        <FarihyRoomPresentationCard
          key={index} // React needs a key for lists
          imageSrc={section.imageSrc || ""} // Handle optional image
          reversed={section.reversed ?? (index % 2 !== 0)} // Optional: Auto-alternate sides if not specified
          mainText={section.text}
          details={section.details}
        />
      ))}

      {/* 4. GALLERY (At the bottom) */}
      <LargePictureGallery title={galleryTitle} images={galleryImages} />
    </>
  );
};

export default FarihyRoomPageTemplate;