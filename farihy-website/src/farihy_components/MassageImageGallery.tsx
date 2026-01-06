import React from "react";
import ImageGallery from "../components/ImageGallery";

/**
 * MassageGallery serves as the data provider for the
 * generic ImageGallery component.
 */
const MassageGallery: React.FC = () => {
  const basePath = "/src/assets/pictures/spa/";
  const massageContent = {
    title: "Un moment de détente",
    subtitle:
      "Confiez-vous aux mains expertes de notre masseuse pour une parenthèse de relaxation et de sérénité.",
    images: [
      {
        path: basePath + "massage-1.jpg",
        alt: "Massage aux huiles essentielles",
      },
      {
        path: basePath + "massage-2-crop.jpg",
        alt: "Massage aux huiles essentielles",
      },
      {
        path: basePath + "massage-3.jpg",
        alt: "Budha statue",
      },
    ],
  };

  return (
    <ImageGallery
      title={massageContent.title}
      subtitle={massageContent.subtitle}
      images={massageContent.images}
      footerTextPrefix="N’attendez plus, "
      footerLinkText="reservez"
      ctaLink="www.google.com"
      footerTextSuffix="dès maintenant."
    />
  );
};

export default MassageGallery;
