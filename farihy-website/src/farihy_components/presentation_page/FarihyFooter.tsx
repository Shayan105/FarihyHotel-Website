import React from "react";
import { Link } from "react-router-dom";

const FarihyFooter = () => {
  // --- Styles ---
  const footerStyle: React.CSSProperties = {
    backgroundColor: "#F0ECE3", // Même fond que le Header pour la cohérence
    color: "#5A4D41",
    padding: "60px 0",
    borderTop: "1px solid rgba(90, 77, 65, 0.1)", // Légère ligne de séparation
    marginTop: "auto", // Pousse le footer vers le bas si le contenu est court
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "16px",
    letterSpacing: "0.5px",
    lineHeight: "1.8",
  };

  const linkStyle: React.CSSProperties = {
    color: "#5A4D41",
    textDecoration: "none",
    transition: "opacity 0.2s",
  };

  const socialIconStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    fill: "#5A4D41",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="row align-items-center gy-5">
          
          {/* COLONNE 1 : CONTACT (Gauche sur Desktop, Centre sur Mobile) */}
          <div className="col-md-4 text-center text-md-start">
<div style={textStyle}>
  <p className="mb-1">
    <a href="tel:+261320741355" style={linkStyle}>
      +261 32 07 413 55
    </a>
  </p>
  <p className="mb-1">
    <a href="tel:+261388480370" style={linkStyle}>
      +261 38 84 803 70
    </a>
  </p>
  <a href="mailto:farihyhotel@gmail.com" style={linkStyle}>
    farihyhotel@gmail.com
  </a>
</div>
          </div>

          {/* COLONNE 2 : LOGO CENTRAL */}
          <div className="col-md-4 text-center">
            {/* Logo Image */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <img 
                    src="/pictures/accueil/logo.webp" 
                    alt="Farihy Logo" 
                    style={{ height: "60px", objectFit: "contain", marginBottom: "15px" }} 
                />
                <h3 className="text-uppercase m-0" style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    letterSpacing: "3px", 
                    fontSize: "1.5rem",
                    color: "#5A4D41"
                }}>
                    FARIHY HOTEL
                </h3>

            </Link>
          </div>

          {/* COLONNE 3 : RESEAUX SOCIAUX (Droite sur Desktop, Centre sur Mobile) */}
          <div className="col-md-4 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-4 mb-3">
              {/* Instagram SVG */}
              <a href="https://www.instagram.com/farihyhotel.ampefy?igsh=MW0wdGI5NTg0NHlhbQ==" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" style={socialIconStyle}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a href="https://www.facebook.com/share/17XuYC3UTX/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" style={socialIconStyle}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <p style={{ ...textStyle, fontSize: "14px", fontWeight: "bold" }}>FarihyAmpefy</p>
          </div>
          
        </div>

        {/* Petit Copyright en bas, très discret */}
        <div className="row mt-5 pt-4 border-top border-secondary-subtle">
           <div className="col-12 text-center" style={{ fontSize: "12px", opacity: 0.6 }}>
              &copy; {new Date().getFullYear()} Farihy Hôtel. Tous droits réservés.
           </div>
        </div>

      </div>
    </footer>
  );
};

export default FarihyFooter;