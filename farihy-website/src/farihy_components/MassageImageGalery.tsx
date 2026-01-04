import React from 'react';
import ImageGallery from '../components/ImageGallery';

/**
 * MassageGallery serves as the data provider for the 
 * generic ImageGallery component.
 */
const MassageGallery: React.FC = () => {
  const massageContent = {
    title: "Un moment de détente",
    subtitle: "Confiez-vous aux mains expertes de notre masseuse pour une parenthèse de relaxation et de sérénité.",
    images: [
      { 
        path: "/src/assets/massage-tahina-2.png", 
        alt: "Massage aux huiles essentielles" 
      },
      { 
        path: "/src/assets/massage-budha.png", 
        alt: "Espace zen avec bougies et statue" 
      },
      { 
        path: "/src/assets/massage-tahina-1.png", 
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
      footerTextPrefix='N’attendez plus, '
      footerLinkText='reservez'
      ctaLink='www.google.com'
      footerTextSuffix='dès maintenant.'
    />
  );
};

export default MassageGallery;