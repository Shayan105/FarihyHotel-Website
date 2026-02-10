import React from "react";
import ImageGallery from "../../components/ImageGallery";
import { useTranslation } from "react-i18next";

/**
 * Restaurant serves as the data provider for the
 * generic ImageGallery component.
 */
const RestaurantGallery: React.FC = () => {
  const {t} = useTranslation();
  const basePath = "/pictures/restaurant/";
  const massageContent = {
    title: t('galleries.restaurant.title'),
    subtitle:t('galleries.restaurant.subtitle'),
    images: [
      {
        path: basePath + "restaurant-1.webp",
        focusPosition: "right",
      },
      {
        path: basePath + "restaurant-2.webp",
        focusPosition: "30%",
      },
      {
        path: basePath + "restaurant-3.webp",
        focusPosition: "10% ",
      },
      {
        path: basePath + "restaurant-4.webp",
        focusPosition: "left",
      },
      {
        path: basePath + "restaurant-4.webp",
        focusPosition: "right",
      },
      {
        path: basePath + "restaurant-5.webp",
        focusPosition: "10%",
      },

      {
        path: basePath + "restaurant-7.webp",
        focusPosition: "30%",
        
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

export default RestaurantGallery;
