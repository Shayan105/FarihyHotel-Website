import React from 'react';
import ImageGallery from '../components/ImageGallery';

/**
 * Restaurant serves as the data provider for the 
 * generic ImageGallery component.
 */
const RestaurantGallery: React.FC = () => {
  const massageContent = {
    title: "Le restaurant",
    subtitle: "Installez-vous sur la terrasse, la plage ou dans le jardin, laissez-vous porter par la vue sur le lac Itasy et savourez l’instant au bord de la piscine.",
    images: [
      { 
        path: "/src/assets/restaurant-1.png", 
        alt: "Massage aux huiles essentielles" 
      },
      { 
        path: "/src/assets/restaurant-2.png", 
        alt: "Espace zen avec bougies et statue" 
      },
      { 
        path: "/src/assets/restaurant-3.png", 
        alt: "Soin relaxant du dos" 
      },
            { 
        path: "/src/assets/massage-tahina-1.png", 
        alt: "Soin relaxant du dos" 
      },
            { 
        path: "/src/assets/massage-tahina-1.png", 
        alt: "Soin relaxant du dos" 
      },
    ]
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