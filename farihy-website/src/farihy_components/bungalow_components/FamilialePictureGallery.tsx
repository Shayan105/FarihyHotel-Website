import React from "react";
import FarihyRoomPageTemplate from "../FarihyRoomPageTemplate";
import { GalleryImage } from "../../components/LargePictureGallery";

const FarihyFamilialPage = () => {

  // --- 1. GESTION DES IMAGES ---
  const basePath = "/src/assets/pictures/familiale/";

  // Images pour le slider (sans alt)
  const bungalowImages: GalleryImage[] = [
    { src: basePath + "1.jpg" },
    { src: basePath + "2.jpg" },
    { src: basePath + "3.jpg" },
    { src: basePath + "4.jpg" },
    { src: basePath + "ext.jpg" },
    { src: basePath + "out.jpg" },
    

  ];

  // --- 2. TEXTES & INFOS ---
  const description = [
    "Idéal pour un groupe d'amis ou une famille, nos quatre bungalows familiaux disposent de deux grands lits Queen-size et d'un petit lit, d'une salle de bains et d'une petite terrasse.",
    "Les équipements incluent la ventilation, la télévision ainsi que la connexion WIFI."
  ];

  const infosPratiques = {
    price: "Tarif hors petit-déjeuner : 425.000 Ariary la nuit",
    checkIn: "Check-in : à partir de 13h00 & Check-out : avant 11h00",
    restaurantHours: "Horaires restaurant : 7h30–21h00"
  };

  // --- 3. RENDU DU TEMPLATE ---
  return (
    <>
    <FarihyRoomPageTemplate
      // -- En-tête --
      headerImageSrc={basePath + "out.jpg"}
      pageTitle="Bungalow familial"

      // -- Présentation --
      presentationImageSrc={basePath + "ext.jpg"}
      presentationReversed={true}
      presentationText={description}
      presentationDetails={infosPratiques}
    />
    
    <FarihyRoomPageTemplate

      // -- Présentation --
      presentationImageSrc={basePath + "ext.jpg"}
      presentationReversed={false}
      presentationText={description}
      presentationDetails={infosPratiques}

      // -- Galerie --
      galleryTitle="Aperçu du bungalow"
      galleryImages={bungalowImages}
    />






    
    </>
    
    
  );
};

export default FarihyFamilialPage;