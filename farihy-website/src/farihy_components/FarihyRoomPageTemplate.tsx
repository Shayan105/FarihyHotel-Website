import React from "react";
import FarihyRoomPresentationCard from "./FarihyRoomPresentationCard";
import LargePictureGallery, {
  GalleryImage,
} from "../components/LargePictureGallery";

// 1. Définition de TOUTES les données acceptées par la page
interface RoomPageProps {
  // Header
  headerImageSrc?: string;
  pageTitle?: string;

  // Presentation Card
  presentationImageSrc?: string;
  presentationText: string[];
  presentationDetails?: {
    price?: string;
    checkIn?: string;
    restaurantHours?: string;
  };
  presentationReversed?: boolean; // Optionnel (défaut: true)

  // Gallery
  galleryTitle?: string;
  galleryImages?: GalleryImage[];
}

const FarihyRoomPageTemplate: React.FC<RoomPageProps> = ({
  headerImageSrc,
  pageTitle,
  presentationImageSrc,
  presentationText,
  presentationDetails,
  presentationReversed = true, // Par défaut, image à droite
  galleryTitle = "Aperçu de la chambre",
  galleryImages,
}) => {
  // Styles globaux
  const pageStyle = {
    backgroundColor: "#F9F5F0",
    color: "#4a3728",
    fontFamily: "'Playfair Display', serif",
  };

  return (
    <>
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

      {/* 2. TITRE DYNAMIQUE */}
      <div className="container py-5 text-center">
        <h1 className="display-4" style={{ color: "#4a3728" }}>
          {pageTitle}
        </h1>
      </div>

      {/* 3. CARTE DE PRÉSENTATION DYNAMIQUE */}
      <FarihyRoomPresentationCard
        imageSrc={presentationImageSrc}
        reversed={presentationReversed}
        mainText={presentationText}
        details={presentationDetails}
      />

      {/* 4. GALERIE DYNAMIQUE */}
      <LargePictureGallery title={galleryTitle} images={galleryImages} />
    </>
  );
};

export default FarihyRoomPageTemplate;
