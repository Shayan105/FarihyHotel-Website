import React from "react";
import FarihyRoomPageTemplate from "./FarihyRoomPageTemplate";
import FarihyRoomGallery from "../PresentationPage/FarihyRoomGallery"; // 1. Import the gallery component
import { GalleryImage } from "../../components/LargePictureGallery";

// Define interface for readability (optional, based on your project structure)
interface PresentationSection {
  imageSrc: string;
  reversed: boolean;
  text: string[];
  details?: {
    price: string;
    checkIn: string;
  };
}

const FarihyFamilialPage = () => {
  const basePath = "/src/assets/pictures/familiale/";

  // --- 1. Gallery Images (Current Room) ---
  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.jpg" },
    { src: basePath + "2.jpg" },
    { src: basePath + "3.jpg" },
    { src: basePath + "4.jpg" },
    { src: basePath + "out.jpg" },
    { src: basePath + "ext.jpg" },
  ];

  // --- 2. Define your Sections ---
  const pageSections: PresentationSection[] = [
    {
      imageSrc: basePath + "ext.jpg",
      reversed: true, // Image on Right
      text: [
        "Idéal pour un groupe d’amis ou une famille, nos quatre bungalows familiaux disposent de deux grands lit Queen-size et d’un petit lit, d’une salle de bains et d’une petite terrasse.",
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI."
      ],
      details: {
        price: "Tarif hors petit-déjeuner : 425.000 Ariary la nuit",
        checkIn: "Check-in : 13h00 - Check-out : 11h00",
      },
    },
  ];

  // --- 3. Render ---
  return (
    <FarihyRoomPageTemplate
      // Global Header
      headerImageSrc={basePath + "out.jpg"}
      pageTitle="Bungalow familial"
      
      // The content list
      contentSections={pageSections}
      
      // Current Room Gallery
      galleryTitle="Aperçu du bungalow"
      galleryImages={bungalowImages}
      
      otherRoomsComponent={<FarihyRoomGallery />} 
    />
  );
};

export default FarihyFamilialPage;