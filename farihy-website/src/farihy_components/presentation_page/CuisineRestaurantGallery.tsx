import React from "react";
import ImageGallery from "../../components/ImageGallery";

/**
 * Cuisine serves as the data provider for the
 * generic ImageGallery component.
 */
const CuisineGallery: React.FC = () => {
  const basePath = "/pictures/cuisine/";
  const massageContent = {
    title: "La Cuisine",
    subtitle:
      "Une cuisine simple, généreuse et authentique, préparée avec des produits frais de saison et servie avec le sourire, de notre cuisine à votre table. ",
    images: [
      {
        path: basePath + "cuisine-1.webp",
        focusPosition: "top",
      },
      {
        path: basePath + "cuisine-2.webp",
        focusPosition: "",
      },
      {
        path: basePath + "cuisine-3.webp",
        focusPosition: "",
      },
      {
        path: basePath + "cuisine-4.webp",
        focusPosition: "0% 40%",
      },
      {
        path: basePath + "cuisine-5.webp",
        focusPosition: "bottom",
      },
      {
        path: basePath + "cuisine-6.webp",
        focusPosition: "0%50%",
      },
    ],
  };

  return (
    <ImageGallery
      title={massageContent.title}
      subtitle={massageContent.subtitle}
      images={massageContent.images}
    />
  );
};

export default CuisineGallery;
