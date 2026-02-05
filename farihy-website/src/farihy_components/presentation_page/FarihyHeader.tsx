import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
const FarihyHeader = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  
  // States for scroll animation
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const headerRef = useRef<HTMLElement>(null);
  const HEADER_HEIGHT = "60px";

  // --- SCROLL LOGIC (MOBILE ONLY) ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isMobile = window.innerWidth < 768; // Check if screen is mobile size

      if (!isMobile) {
        // If not mobile, always keep header visible
        setVisible(true);
        return;
      }

      // Hide/Show logic for mobile
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10 || isMenuOpen;

      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleMobileSubMenu = () => {
    setIsMobileSubMenuOpen(!isMobileSubMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileSubMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bungalowLinks = [
    { label: t('nav.doubles'), path: "/double" },
    { label: t('nav.familials'), path: "/familiale" },
    { label: t('nav.suite'), path: "/suite" },
    { label: t('nav.duplex'), path: "/duplex" },
    { label: t('nav.villa'), path: "/villa" },
  ];

  // --- STYLES ---
  const headerStyle: React.CSSProperties = {
    backgroundColor: "#F0ECE3",
    color: "#5A4D41",
    height: HEADER_HEIGHT,
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
    // This transform only effectively "hides" it if visible is false (which only happens on mobile)
    transform: visible ? "translateY(0)" : `translateY(-${HEADER_HEIGHT})`,
  };

  const linkStyle: React.CSSProperties = {
    color: "#5A4D41",
    textDecoration: "none",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.2s",
    padding: "5px 0",
    display: "block",
  };

  const mobileMenuContainerStyle: React.CSSProperties = {
    position: "absolute", 
    top: HEADER_HEIGHT,
    left: 0, 
    width: "100%", 
    backgroundColor: "#F0ECE3",
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "10px", 
    padding: "20px 0",
    transition: "all 0.3s ease-in-out", 
    opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
    pointerEvents: isMenuOpen ? "auto" : "none", 
    visibility: isMenuOpen ? "visible" : "hidden",
    maxHeight: "85vh", 
    overflowY: "auto", 
    borderTop: "1px solid rgba(0,0,0,0.05)"
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
          <a href="/" onClick={closeAllMenus}> 
            <img 
              src="/pictures/accueil/logo.webp" 
              alt="Logo" 
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </a>
        </div>

        {/* DESKTOP NAV */}
        <nav className="d-none d-md-flex gap-4 align-items-center">
          <a href="/" style={linkStyle} onClick={closeAllMenus}>{t('nav.home')}</a>
          <div 
            style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span style={{ ...linkStyle, cursor: "default" }}>{t('nav.bungalows')}</span>
            <div style={{
                position: "absolute", top: "100%", left: "0", backgroundColor: "#F0ECE3", minWidth: "200px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)", padding: "10px 0", borderRadius: "0 0 8px 8px",
                opacity: isDropdownOpen ? 1 : 0, visibility: isDropdownOpen ? "visible" : "hidden",
                transform: isDropdownOpen ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease"
            }}>
              {bungalowLinks.map((subItem) => (
                <a key={subItem.label} href={subItem.path} style={{...linkStyle, padding: "10px 20px", fontWeight: "normal"}} className="dropdown-link-hover" onClick={closeAllMenus}>
                  {subItem.label}
                </a>
              ))}
            </div>
          </div>
          <a href="/reservation" style={linkStyle} onClick={closeAllMenus}>{t('nav.book')}</a>
          <a href="/contact" style={linkStyle} onClick={closeAllMenus}>{t('nav.contact')}</a>
          <LanguageSwitcher />
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="d-md-none" onClick={toggleMenu} style={{ cursor: "pointer", fontSize: "24px" }}>
          {isMenuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div style={mobileMenuContainerStyle}>
        <a href="/" style={{ ...linkStyle, fontSize: '18px' }} onClick={closeAllMenus}>{t('nav.home')}</a>
        <div style={{ width: "100%", textAlign: "center" }}>
          <div onClick={toggleMobileSubMenu} style={{ ...linkStyle, fontSize: '18px', cursor: "pointer" }}>{t('nav.bungalows')}</div>
          <div style={{ display: "grid", gridTemplateRows: isMobileSubMenuOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease-out" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ backgroundColor: "rgba(0,0,0,0.03)", padding: "10px 0" }}>
                {bungalowLinks.map((subItem) => (
                  <a key={subItem.label} href={subItem.path} style={{ ...linkStyle, fontSize: "16px", fontWeight: "normal", padding: "8px 0" }} onClick={closeAllMenus}>
                    {subItem.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <a href="/reservation" style={{ ...linkStyle, fontSize: '18px' }} onClick={closeAllMenus}>{t('nav.book')}</a>
        <a href="/contact" style={{ ...linkStyle, fontSize: '18px' }} onClick={closeAllMenus}>{t('nav.contact')}</a>
      </div>

      <style>{`
        .dropdown-link-hover:hover { background-color: rgba(90, 77, 65, 0.1); }
      `}</style>
    </header>
  );
};

export default FarihyHeader;