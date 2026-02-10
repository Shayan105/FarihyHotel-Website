import React from "react";
import { useTranslation } from "react-i18next"; // Import du hook
import FarihyRoomPresentationCard from "./FarihyRoomPresentationCard";
import LargePictureGallery, {
  GalleryImage,
} from "../../components/LargePictureGallery";

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

interface RoomPageProps {
  headerImageSrc?: string;
  pageTitle?: string;
  contentSections: PresentationSection[]; 
  galleryTitle?: string;
  galleryImages?: GalleryImage[];
  otherRoomsComponent?: React.ReactNode;
}

const FarihyRoomPageTemplate: React.FC<RoomPageProps> = ({
  headerImageSrc,
  pageTitle,
  contentSections,
  galleryTitle, // On retire la valeur par défaut ici
  galleryImages,
  otherRoomsComponent,
}) => {
  const { t } = useTranslation(); // Initialisation du hook

  // Gestion du titre de la galerie (valeur fournie ou traduction par défaut)
  const finalGalleryTitle = galleryTitle || t('bungalows.template.gallery_picture_title');

  const titleStyle = { 
    color: "#4a3728", 
    fontFamily: "'Playfair Display', serif" 
  };

  return (
    <>
      {/* Header Image */}
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

      {/* Page Title */}
      {pageTitle && (
        <div className="container py-5 text-center">
          <h1 className="display-4" style={titleStyle}>
            {pageTitle}
          </h1>
        </div>
      )}

      {/* Content Sections */}
      {contentSections.map((section, index) => (
        <FarihyRoomPresentationCard
          key={index}
          imageSrc={section.imageSrc || ""}
          // Auto-alternate alignment if not specified
          reversed={section.reversed ?? (index % 2 !== 0)} 
          mainText={section.text}
          details={section.details}
        />
      ))}

      {/* Photo Gallery */}
      <LargePictureGallery title={finalGalleryTitle} images={galleryImages || []} />

      {/* Suggestions Section */}
      {otherRoomsComponent && (
        <div className="container-fluid py-5" style={{ backgroundColor: "#F9F5F0" }}>
            <div className="container text-center">
                <hr className="mb-5 opacity-25" style={{ borderColor: "#4a3728", width: "60%", margin: "0 auto" }} />
                
                <h3 className="display-6 mb-5" style={titleStyle}>
                    {t('bungalows.template.suggestions_title')}
                </h3>
                
                {otherRoomsComponent}
            </div>
        </div>
      )}
    </>
  );
};

export default FarihyRoomPageTemplate;