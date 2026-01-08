import React, { useState } from "react";

const FarihyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Styles ---
  const headerStyle: React.CSSProperties = {
    backgroundColor: "#F0ECE3",
    color: "#5A4D41",
    height: "80px",
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const linkStyle: React.CSSProperties = {
    color: "#5A4D41",
    textDecoration: "none",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.2s", // Smooth hover effect on color
  };

  // --- ANIMATED MOBILE MENU STYLES ---
  const mobileMenuContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "80px", 
    left: 0,
    width: "100%",
    backgroundColor: "#F0ECE3",
    borderTop: "1px solid #ddd",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    
    // Animation Properties
    transition: "all 0.3s ease-in-out", // The magic sauce for smoothness
    opacity: isMenuOpen ? 1 : 0,        // Fade in/out
    transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)", // Slide down/up
    pointerEvents: isMenuOpen ? "auto" : "none", // Prevent clicking when hidden
    visibility: isMenuOpen ? "visible" : "hidden", // Hide from screen readers when closed
  };

  const iconStyle: React.CSSProperties = {
    cursor: "pointer", 
    fontSize: "24px", 
    userSelect: "none",
    transition: "transform 0.3s ease", // Rotate the icon smoothly
    transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
  };

  const navItems = ["ACCUEIL", "BUNGALOWS", "GALERIE", "CONTACT", "RESERVER"];

  return (
    <header className="fixed-top w-100 px-4" style={headerStyle}>
      <div className="container-fluid h-100 d-flex justify-content-between align-items-center">
        
        {/* Left: Logo */}
        <div className="d-flex align-items-center">
          <img 
             src="/src/assets/pictures/accueil/logo.png" 
             alt="Logo" 
             style={{ height: '50px', objectFit: 'contain' }} 
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="d-none d-md-flex gap-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={linkStyle}>
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="d-md-none" onClick={toggleMenu} style={iconStyle}>
          {isMenuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Menu Dropdown (Always rendered, visually toggled) */}
      <div style={mobileMenuContainerStyle}>
        {navItems.map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            style={{ ...linkStyle, fontSize: '18px' }}
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </header>
  );
};

export default FarihyHeader;