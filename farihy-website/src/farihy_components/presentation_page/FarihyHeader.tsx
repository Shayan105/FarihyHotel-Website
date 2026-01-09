import React, { useState, useEffect, useRef } from "react";
// We no longer import Link from react-router-dom
// because we are using standard <a> tags for real refreshes

const FarihyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false); // Mobile

  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleMobileSubMenu = () => {
    setIsMobileSubMenuOpen(!isMobileSubMenuOpen);
  };

  // --- CRITICAL FIX ---
  // We must reset the mobile submenu state when closing the main menu.
  // This ensures that next time you open the hamburger, the submenu starts fresh.
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileSubMenuOpen(false); // <--- Uncommented and forced to false
  };

  // --- CLICK OUTSIDE MANAGEMENT ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAllMenus(); // Use the central function to clean up all states
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const bungalowLinks = [
    { label: "Les Doubles", path: "/double" },
    { label: "Familiales", path: "/familiale" },
    { label: "La Suite", path: "/suite" },
    { label: "Les Duplex", path: "/duplex" },
    { label: "La Villa", path: "/villa" },
  ];

  // --- STYLES ---
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
    padding: "10px 0",
    display: "block",
  };

  // --- DESKTOP DROPDOWN STYLE ---
  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#F0ECE3",
    minWidth: "200px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    padding: "10px 0",
    borderRadius: "0 0 8px 8px",
    opacity: isDropdownOpen ? 1 : 0,
    visibility: isDropdownOpen ? "visible" : "hidden",
    transform: isDropdownOpen ? "translateY(0)" : "translateY(10px)",
    transition: "all 0.3s ease",
  };

  // --- MOBILE WRAPPER STYLE ---
  const subMenuWrapperStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateRows: isMobileSubMenuOpen ? "1fr" : "0fr", 
    transition: "grid-template-rows 0.3s ease-out",
  };

  const subMenuInnerStyle: React.CSSProperties = {
    overflow: "hidden", 
  };

  const mobileMenuContainerStyle: React.CSSProperties = {
    position: "absolute", top: "80px", left: 0, width: "100%", backgroundColor: "#F0ECE3",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px 0",
    transition: "all 0.3s ease-in-out", opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
    pointerEvents: isMenuOpen ? "auto" : "none", visibility: isMenuOpen ? "visible" : "hidden",
    maxHeight: "85vh", overflowY: "auto", borderTop: "1px solid rgba(0,0,0,0.05)"
  };

  return (
    <header 
      ref={headerRef} 
      className="fixed-top w-100 px-4" 
      style={headerStyle}
    >
      <div className="container-fluid h-100 d-flex justify-content-between align-items-center">
        
        {/* LOGO */}
        <div className="d-flex align-items-center">
          {/* Changed Link to a href */}
          <a href="/" onClick={closeAllMenus}> 
            <img src="/src/assets/pictures/accueil/logo.png" alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
          </a>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="d-none d-md-flex gap-4 align-items-center">
          <a href="/" style={linkStyle} onClick={closeAllMenus}>ACCUEIL</a>

          {/* Menu Dropdown Desktop */}
          <div 
            style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span style={{ ...linkStyle, cursor: "default" }}>
              BUNGALOWS
            </span>
            <div style={dropdownStyle}>
              {bungalowLinks.map((subItem) => (
                <a 
                  key={subItem.label} 
                  href={subItem.path} 
                  style={{...linkStyle, padding: "10px 20px", fontWeight: "normal"}}
                  className="dropdown-link-hover"
                  onClick={closeAllMenus}
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          </div>

          <a href="/reservation" style={linkStyle} onClick={closeAllMenus}>RÉSERVER</a>
          <a href="/contact" style={linkStyle} onClick={closeAllMenus}>CONTACT</a>
        </nav>

        {/* ================= MOBILE TOGGLE ================= */}
        <div className="d-md-none" onClick={toggleMenu} style={{ cursor: "pointer", fontSize: "24px" }}>
          {isMenuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div style={mobileMenuContainerStyle}>
        <a href="/" style={{ ...linkStyle, fontSize: '18px' }} onClick={closeAllMenus}>
          ACCUEIL
        </a>

        {/* Section Bungalows Mobile */}
        <div style={{ width: "100%", textAlign: "center" }}>
          
          <div 
            onClick={toggleMobileSubMenu} 
            style={{ ...linkStyle, fontSize: '18px', cursor: "pointer", userSelect: "none" }}
          >
            BUNGALOWS
          </div>
          
          <div style={subMenuWrapperStyle}>
            <div style={subMenuInnerStyle}>
              <div style={{ backgroundColor: "rgba(0,0,0,0.03)", padding: "10px 0" }}>
                {bungalowLinks.map((subItem) => (
                  <a
                    key={subItem.label}
                    href={subItem.path}
                    style={{ ...linkStyle, fontSize: "16px", fontWeight: "normal", padding: "8px 0" }}
                    onClick={closeAllMenus}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a href="/reservation" style={{ ...linkStyle, fontSize: '18px' }} onClick={closeAllMenus}>
          RÉSERVER
        </a>
        <a href="/contact" style={{ ...linkStyle, fontSize: '18px' }} onClick={closeAllMenus}>
          CONTACT
        </a>
      </div>

      <style>{`
        .dropdown-link-hover:hover {
          background-color: rgba(90, 77, 65, 0.1);
        }
      `}</style>
    </header>
  );
};

export default FarihyHeader;