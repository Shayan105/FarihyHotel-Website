import React, { useState, useEffect } from "react";
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
  title,
}) => {
  // State for current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for Lightbox visibility
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Safety check
  if (!images || images.length === 0) return null;

  // --- Navigation Functions ---
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

  // Keyboard navigation support (Optional but good UX)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, currentIndex]);

  // Swipe Configuration
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  // --- Styles ---
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#F9F5F0",
    padding: "40px 0",
    userSelect: "none",
    touchAction: "pan-y",
  };

  const titleStyle: React.CSSProperties = {
    color: "#4a3728",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "30px",
    textAlign: "center",
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
    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
    padding: "0 15px",
    userSelect: "none",
  };

  // Lightbox Overlay Styles
  const lightboxOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    right: "30px",
    color: "white",
    fontSize: "50px",
    cursor: "pointer",
    zIndex: 10001,
    lineHeight: "1",
  };

  return (
    <section style={containerStyle}>
      {/* CSS Animation for the slide transition */}
      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0.4; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          .gallery-anim {
            animation: fadeSlide 0.4s ease-out;
          }
        `}
      </style>

      <div className="container">
        {title && (
          <h2 className="display-6" style={titleStyle}>
            {title}
          </h2>
        )}

        {/* --- MAIN SLIDER AREA --- */}
        <div
          className="position-relative shadow-sm mb-3 bg-secondary"
          style={{ height: "500px", borderRadius: "8px", overflow: "hidden" }}
          {...swipeHandlers}
        >
          {/* Navigation Arrows */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            style={{ ...arrowStyle, left: "10px" }}
          >
            ❮
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            style={{ ...arrowStyle, right: "10px" }}
          >
            ❯
          </div>

          {/* Active Image */}
          <img
            // Key is crucial here: it forces React to re-mount the img element 
            // when index changes, triggering the CSS animation.
            key={currentIndex} 
            src={images[currentIndex].src}
            alt={images[currentIndex].alt || `Slide ${currentIndex}`}
            className="w-100 h-100 gallery-anim"
            style={{
              objectFit: "cover",
              cursor: "zoom-in",
            }}
            onClick={() => setIsLightboxOpen(true)}
          />
        </div>

        {/* --- THUMBNAILS --- */}
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
                border:
                  currentIndex === index
                    ? "3px solid #4a3728"
                    : "3px solid transparent",
                opacity: currentIndex === index ? 1 : 0.6,
                transition: "all 0.3s ease",
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

      {/* --- LIGHTBOX (Full Screen) --- */}
      {isLightboxOpen && (
        <div
          style={lightboxOverlayStyle}
          onClick={() => setIsLightboxOpen(false)} // Clicking backdrop closes it
          {...swipeHandlers} // Allow swiping in lightbox mode
        >
          {/* Close Button (X) */}
          <div style={closeButtonStyle}>&times;</div>

          {/* Lightbox Navigation Arrows */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            style={{ ...arrowStyle, left: "20px", fontSize: "60px" }}
          >
            ❮
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            style={{ ...arrowStyle, right: "20px", fontSize: "60px" }}
          >
            ❯
          </div>

          {/* Full Screen Image */}
          <img
            key={currentIndex} // Retrigger animation inside lightbox too
            src={images[currentIndex].src}
            alt="Full screen view"
            className="gallery-anim"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              boxShadow: "0 0 30px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()} // Clicking image does NOT close lightbox
          />
        </div>
      )}
    </section>
  );
};

export default LargePictureGallery;