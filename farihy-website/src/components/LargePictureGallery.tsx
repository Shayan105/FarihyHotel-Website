import React, { useState } from "react";
// Import du hook pour gérer le swipe
import { useSwipeable } from "react-swipeable";

export interface GalleryImage {
  src: string;
  alt?: string;
}

interface LargePictureGalleryProps {
  images: GalleryImage[]; 
  title?: string;         
}

const LargePictureGallery: React.FC<LargePictureGalleryProps> = ({ 
  images, 
  title 
}) => {

  // État pour l'index actuel du slider
  const [currentIndex, setCurrentIndex] = useState(0);
  // NOUVEAU : État pour savoir si la Lightbox (plein écran) est ouverte
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sécurité
  if (!images || images.length === 0) return null;

  // --- Fonctions de navigation ---
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Configuration du Swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });


  // --- Styles de base ---
  const containerStyle = {
    backgroundColor: "#F9F5F0",
    padding: "40px 0",
    userSelect: "none" as const, 
    touchAction: "pan-y" as const,
  };

  const titleStyle = {
    color: "#4a3728",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "30px",
    textAlign: "center" as const,
  };

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "40px",
    color: "white",
    zIndex: 10,
    cursor: "pointer",
    background: "none",
    border: "none",
    textShadow: "0 2px 4px rgba(0,0,0,0.6)", // Ombre un peu plus forte
    padding: "0 15px",
  };

  // --- NOUVEAU : Styles pour la Lightbox (Overlay plein écran) ---
  const lightboxOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Fond noir quasi-transparent
    zIndex: 9999, // Doit être très élevé pour passer au-dessus du Header
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const lightboxImageStyle: React.CSSProperties = {
    maxWidth: "95%",
    maxHeight: "95%",
    objectFit: "contain", // L'image s'adapte sans être coupée
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    right: "30px",
    color: "white",
    fontSize: "50px",
    cursor: "pointer",
    zIndex: 10000,
  };

  return (
    <section style={containerStyle}>
      <div className="container">
        
        {title && <h2 className="display-6" style={titleStyle}>{title}</h2>}

        {/* --- ZONE PRINCIPALE (Slider) --- */}
        <div 
          className="position-relative shadow-sm mb-3 bg-secondary" 
          style={{ height: "500px", borderRadius: "8px", overflow: "hidden" }}
          {...swipeHandlers} 
        >
          
          {/* Flèches de navigation (pour changer d'image sans ouvrir) */}
          <div onClick={(e) => { e.stopPropagation(); goToPrevious(); }} style={{ ...arrowStyle, left: "10px" }}>❮</div>
          <div onClick={(e) => { e.stopPropagation(); goToNext(); }} style={{ ...arrowStyle, right: "10px" }}>❯</div>

          {/* L'image active */}
          {/* NOUVEAU : Ajout de onClick pour ouvrir la lightbox et cursor: pointer */}
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt || `Slide ${currentIndex}`} 
            className="w-100 h-100"
            style={{ 
                objectFit: "cover", 
                transition: "opacity 0.3s", 
                cursor: "zoom-in" // Indique qu'on peut cliquer pour agrandir
            }}
            onClick={() => setIsLightboxOpen(true)}
          />
        </div>

        {/* --- MINIATURES --- */}
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {images.map((img, index) => (
            <div 
              key={index} 
              onClick={() => goToSlide(index)}
              style={{ 
                width: "80px", 
                height: "60px", 
                cursor: "pointer",
                borderRadius: "4px",
                overflow: "hidden",
                border: currentIndex === index ? "3px solid #4a3728" : "3px solid transparent",
                opacity: currentIndex === index ? 1 : 0.6,
                transition: "all 0.3s ease"
              }}
            >
              <img 
                src={img.src} 
                alt="thumbnail" 
                className="w-100 h-100" 
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

      </div>

      {/* --- NOUVEAU : LA LIGHTBOX (S'affiche uniquement si isLightboxOpen est true) --- */}
      {isLightboxOpen && (
        <div 
          style={lightboxOverlayStyle} 
          onClick={() => setIsLightboxOpen(false)} // Cliquer dans le vide ferme la lightbox
        >
          {/* Bouton Fermer (X) */}
          <div style={closeButtonStyle}>&times;</div>
          
          {/* L'image en grand */}
          <img 
            src={images[currentIndex].src} 
            alt="Full screen view" 
            style={lightboxImageStyle}
            onClick={(e) => e.stopPropagation()} // Cliquer sur l'image ne ferme PAS la lightbox
          />
        </div>
      )}

    </section>
  );
};

export default LargePictureGallery;