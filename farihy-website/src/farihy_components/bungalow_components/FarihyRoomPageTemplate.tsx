import React from "react";
import FarihyRoomPresentationCard from "./FarihyRoomPresentationCard";
import LargePictureGallery, {
  GalleryImage,
} from "../../components/LargePictureGallery";

// 1. Structure d'une section de contenu (Texte + Image)
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

// 2. Props globales du Template
interface RoomPageProps {
  // Header & Titre
  headerImageSrc?: string;
  pageTitle?: string;

  // Contenu principal (Liste de sections)
  contentSections: PresentationSection[]; 

  // Galerie photo
  galleryTitle?: string;
  galleryImages?: GalleryImage[];

  // NOUVEAU : Le composant pour les autres chambres (Optionnel)
  otherRoomsComponent?: React.ReactNode;
}

const FarihyRoomPageTemplate: React.FC<RoomPageProps> = ({
  headerImageSrc,
  pageTitle,
  contentSections,
  galleryTitle = "Aperçu de la chambre",
  galleryImages,
  otherRoomsComponent, // <-- On récupère le composant ici
}) => {
  
  const titleStyle = { 
    color: "#4a3728", 
    fontFamily: "'Playfair Display', serif" 
  };

  return (
    <>
      {/* 1. HEADER (Affiché seulement si une image est fournie) */}
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

      {/* 2. TITRE DE LA PAGE */}
      {pageTitle && (
        <div className="container py-5 text-center">
          <h1 className="display-4" style={titleStyle}>
            {pageTitle}
          </h1>
        </div>
      )}

      {/* 3. SECTIONS DE PRÉSENTATION (Boucle sur le contenu) */}
      {contentSections.map((section, index) => (
        <FarihyRoomPresentationCard
          key={index}
          imageSrc={section.imageSrc || ""}
          reversed={section.reversed ?? (index % 2 !== 0)} // Alterne gauche/droite auto si non précisé
          mainText={section.text}
          details={section.details}
        />
      ))}

      {/* 4. GALERIE PHOTOS */}
      <LargePictureGallery title={galleryTitle} images={galleryImages} />

      {/* 5. SUGGESTIONS (Ils pourraient aussi vous plaire) */}
      {otherRoomsComponent && (
        <div className="container-fluid py-5" style={{ backgroundColor: "#F9F5F0" }}>
            <div className="container text-center">
                {/* Petit trait de séparation élégant */}
                <hr className="mb-5 opacity-25" style={{ borderColor: "#4a3728", width: "60%", margin: "0 auto" }} />
                
                <h3 className="display-6 mb-5" style={titleStyle}>
                    Ils pourraient aussi vous plaire
                </h3>
                
                {/* Affichage du composant passé en props (ex: FarihyRoomGallery) */}
                {otherRoomsComponent}
            </div>
        </div>
      )}
    </>
  );
};

export default FarihyRoomPageTemplate;