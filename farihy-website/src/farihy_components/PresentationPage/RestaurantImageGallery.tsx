import React from "react";
import ImageGallery from "../../components/ImageGallery";

/**
 * Restaurant serves as the data provider for the
 * generic ImageGallery component.
 */
const RestaurantGallery: React.FC = () => {
  const basePath = "/src/assets/pictures/restaurant/";
  const massageContent = {
    title: "Le restaurant",
    subtitle:
      "Installez-vous sur la terrasse, la plage ou dans le jardin, laissez-vous porter par la vue sur le lac Itasy et savourez l’instant au bord de la piscine.",
    images: [
      {
        path: basePath + "restaurant-1.jpg",
        focusPosition: "right",
      },
      {
        path: basePath + "restaurant-2.jpg",
        focusPosition: "30%",
      },
      {
        path: basePath + "restaurant-3.jpg",
        focusPosition: "10% ",
      },
      {
        path: basePath + "restaurant-4.jpg",
        focusPosition: "left",
      },
      {
        path: basePath + "restaurant-4.jpg",
        focusPosition: "right",
      },
      {
        path: basePath + "restaurant-5.jpg",
        focusPosition: "10%",
      },

      {
        path: basePath + "restaurant-7.jpg",
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
