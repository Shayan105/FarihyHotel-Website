import React, { useEffect } from 'react';

const FarihyBanner: React.FC = () => {
  // 1. Add the auto-scroll logic
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only auto-scroll if the user is still at the very top (hasn't scrolled manually)
      if (window.scrollY < 50) {
        window.scrollBy({
          top: window.innerHeight, // Scroll down by exactly one screen height
          behavior: "smooth",      // Make it a smooth "swipe" effect
        });
      }
    }, 2000); // 1.5 seconds delay

    // Cleanup: clear the timer if the component unmounts before 1.5s
    return () => clearTimeout(timer);
  }, []);

  const bannerStyle: React.CSSProperties = {
    backgroundImage: 'url("/src/assets/pictures/accueil/banner.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'relative',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: '"Playfair Display", serif',
    color: '#FFFFFF',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  return (
    <section className="d-flex justify-content-center align-items-center text-center" style={bannerStyle}>
      <div style={overlayStyle}></div>
      
      <div className="position-relative z-1 p-4">
        <h1 
          className="display-1 fw-normal" 
          style={{ ...textStyle, fontSize: '5rem', marginBottom: '0.5rem' }}
        >
          Farihy Hôtel
        </h1>
        <p 
          className="fs-2 fw-light" 
          style={{ ...textStyle, letterSpacing: '0.1em' }}
        >
          Ampefy
        </p>
      </div>

      {/* Optional: A subtle visual cue (Arrow) at the bottom */}
      <div 
        className="position-absolute bottom-0 pb-4 z-1 text-white opacity-75"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>

      {/* Simple animation for the arrow */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </section>
  );
};

export default FarihyBanner;