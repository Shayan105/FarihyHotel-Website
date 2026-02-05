import React from "react";
import ImageGallery from "../../components/ImageGallery";
import { useTranslation } from "react-i18next";

/**
 * Cuisine serves as the data provider for the
 * generic ImageGallery component.
 */
const CuisineGallery: React.FC = () => {
  const { t } = useTranslation();
  const basePath = "/pictures/cuisine/";
  const massageContent = {
    title: t("galleries.cuisine.title"),
    subtitle:t('galleries.cuisine.subtitle'),
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
