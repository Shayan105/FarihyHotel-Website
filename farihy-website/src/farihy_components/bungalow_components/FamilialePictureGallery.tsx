import React from "react";
import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import ImageGallery from "../../components/ImageGallery";
const FarihyFamilialPage = () => {
  const basePath = "/src/assets/pictures/familiale/";

  // --- 1. Gallery Images ---
  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.jpg" },
    { src: basePath + "2.jpg" },
    { src: basePath + "3.jpg" },
    { src: basePath + "4.jpg" },
  ];

  // --- 2. Define your Sections (The text/image blocks) ---
  const pageSections: PresentationSection[] = [
    // BLOCK 1: Introduction
    {
      imageSrc: basePath + "ext.jpg",
      reversed: true, // Image on Right
      text: [
        "Idéal pour un groupe d'amis ou une famille, nos quatre bungalows familiaux disposent de deux grands lits Queen-size et d'un petit lit.",
        "Profitez d'une salle de bains moderne et d'une petite terrasse privée."
      ],
      details: {
        price: "Tarif hors petit-déjeuner : 425.000 Ariary la nuit",
        checkIn: "Check-in : 13h00 - Check-out : 11h00",
      }
    },
    // BLOCK 2: Additional Info / Second View
    {
      imageSrc: basePath + "out.jpg", // Different image
      reversed: false, // Image on Left
      text: [
        "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI haut débit.",
        "Le calme environnant vous garantit un repos total après vos excursions."
      ],
      // No details needed here, so we omit 'details'
    }
  ];

  // --- 3. Render Once ---
  return (
    <FarihyRoomPageTemplate
      // Global Header
      headerImageSrc={basePath + "out.jpg"}
      pageTitle="Bungalow familial"
      
      // The content list
      contentSections={pageSections}

      // Gallery
      galleryTitle="Aperçu du bungalow"
      galleryImages={bungalowImages}
    />
  );
};

export default FarihyFamilialPage;