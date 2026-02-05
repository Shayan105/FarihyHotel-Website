import React from "react";
import { useTranslation } from "react-i18next";

interface InfoDetails {
  price?: string;
  checkIn?: string;
  restaurantHours?: string;
  addText?: string;
}

interface FarihyRoomPresentationCardProps {
  imageSrc: string;
  mainText: string[];
  details?: InfoDetails;
  reversed?: boolean;
}

const FarihyRoomPresentationCard: React.FC<FarihyRoomPresentationCardProps> = ({
  imageSrc,
  mainText,
  details,
  reversed = false,
}) => {
  const {t} = useTranslation();
  const themeColors = {
    bg: "#F9F5F0",
    text: "#4a3728",
  };

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    color: themeColors.text,
  };

  // Logique de la bordure (reste la même)
  const borderClass = reversed ? "border-start" : "border-end";

  return (
    <section
      className="container-fluid p-0"
      style={{ backgroundColor: themeColors.bg }}
    >
      <div className={`row g-0 ${reversed ? "flex-row-reverse" : ""}`}>
        {/* --- COLONNE TEXTE (50% de la largeur) --- */}
        {/* CHANGEMENT ICI : col-lg-6 au lieu de col-lg-5 */}
        <div
          className={`col-lg-6 d-flex flex-column justify-content-center align-items-center text-center position-relative`}
        >
          {/* Ligne de séparation */}
          <div
            className={`d-none d-lg-block position-absolute top-0 bottom-0 w-100 ${borderClass}`}
            style={{
              borderColor: themeColors.text,
              pointerEvents: "none",
              opacity: 0.3,
            }}
          />

          <div className="p-5" style={{ maxWidth: "600px", zIndex: 1 }}>
            <div className="mb-5">
              {mainText.map((text, index) => (
                <p
                  key={index}
                  className="mb-3 fw-light"
                  style={{
                    ...fontStyle,
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {details && (
              <div className="mt-5">
                <h5
                  className="mb-3 fw-bold"
                  style={{
                    ...fontStyle,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Informations importantes
                </h5>
                <ul
                  className="list-unstyled fw-light"
                  style={{
                    ...fontStyle,
                    fontSize: "0.95rem",
                    lineHeight: "1.8",
                  }}
                >
                  {details.price && <li className="mb-1">{details.price}</li>}
                  {details.checkIn && (
                    <li className="mb-1">{details.checkIn}</li>
                  )}
                  {details.addText && <li>{details.addText}</li>}

                  {details.restaurantHours
                    ? details.restaurantHours
                    : "Horaires restaurant : 7h30-21h00"}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* --- COLONNE IMAGE (50% de la largeur) --- */}
        {/* CHANGEMENT ICI : col-lg-6 au lieu de col-lg-7 */}
        <div className="col-lg-6">
          <img
            src={imageSrc}
            alt="Détail de la chambre"
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              minHeight: "500px",
              maxHeight: "900px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default FarihyRoomPresentationCard;
