import React from "react";
import ImageGallery from "../../components/ImageGallery";

/**
 * MassageGallery serves as the data provider for the
 * generic ImageGallery component.
 */
const MassageGallery: React.FC = () => {
  const basePath = "/pictures/spa/";
  const massageContent = {
    title: "Un moment de détente",
    subtitle:
      "Confiez-vous aux mains expertes de notre masseuse pour une parenthèse de relaxation et de sérénité.",
    images: [
      {
        path: basePath + "massage-1.webp",
        focusPosition: "",
      },
      {
        path: basePath + "massage-2-crop.webp",
        focusPosition: "65%",
      },
      {
        path: basePath + "massage-3.webp",
        focusPosition: "",
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
      ctaLink="/reservation"
      footerTextSuffix="dès maintenant."
    />
  );
};

export default MassageGallery;
