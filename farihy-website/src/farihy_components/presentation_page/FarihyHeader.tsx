import React, { useState } from "react";
// 1. Import Link
import { Link } from "react-router-dom";

const FarihyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    transition: "color 0.2s",
  };

  // ... (keep your other styles: mobileMenuContainerStyle, iconStyle) ...
  // Repeat styles here for context if needed, but keeping your existing ones is fine.
  const mobileMenuContainerStyle: React.CSSProperties = {
     // ... your existing mobile styles
     position: "absolute", top: "80px", left: 0, width: "100%", backgroundColor: "#F0ECE3", 
     display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", 
     transition: "all 0.3s ease-in-out", opacity: isMenuOpen ? 1 : 0, 
     transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
     pointerEvents: isMenuOpen ? "auto" : "none", visibility: isMenuOpen ? "visible" : "hidden",
  };
  const iconStyle: React.CSSProperties = {
     cursor: "pointer", fontSize: "24px", userSelect: "none"
  };

  // 2. Define complex navigation items with paths
  const navItems = [
    { label: "ACCUEIL", path: "/" },
    { label: "BUNGALOWS", path: "/bungalows" }, // Example separate page
    { label: "RESERVER", path: "/reservation" }, // Example separate page
  ];

  return (
    <header className="fixed-top w-100 px-4" style={headerStyle}>
      <div className="container-fluid h-100 d-flex justify-content-between align-items-center">
        
        <div className="d-flex align-items-center">
          <img src="/src/assets/pictures/accueil/logo.png"  alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
        </div>

        {/* Desktop Navigation */}
        <nav className="d-none d-md-flex gap-4">
          {navItems.map((item) => (
            // 3. Use Link instead of <a>
            <Link key={item.label} to={item.path} style={linkStyle}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="d-md-none" onClick={toggleMenu} style={iconStyle}>
          {isMenuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuContainerStyle}>
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path} 
            style={{ ...linkStyle, fontSize: '18px' }}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default FarihyHeader;