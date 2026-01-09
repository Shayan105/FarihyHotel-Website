import React from "react";

interface InfoDetails {
  price?: string;
  checkIn?: string;
  restaurantHours?: string;
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
  
  const themeColors = {
    bg: "#F9F5F0",
    text: "#4a3728",
  };

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    color: themeColors.text,
  };

  return (
    <section 
      className="container-fluid p-0" 
      style={{ backgroundColor: themeColors.bg }}
    >
      <div className={`row g-0 ${reversed ? "flex-row-reverse" : ""}`}>
        
        {/* --- COLONNE TEXTE (40% de la largeur) --- */}
        {/* Changement ici : col-lg-6 devient col-lg-5 */}
        <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-center">
          
          <div className="p-5" style={{ maxWidth: "600px" }}>
            
            <div className="mb-5">
              {mainText.map((text, index) => (
                <p 
                  key={index} 
                  className="mb-3 fw-light"
                  style={{ ...fontStyle, fontSize: "1.1rem", lineHeight: "1.8" }}
                >
                  {text}
                </p>
              ))}
            </div>

            {details && (
              <div className="mt-5">
                <h5 className="mb-3 fw-bold" style={{ ...fontStyle, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Informations importantes
                </h5>
                <ul className="list-unstyled fw-light" style={{ ...fontStyle, fontSize: "0.95rem", lineHeight: "1.8" }}>
                  {details.price && <li className="mb-1">{details.price}</li>}
                  {details.checkIn && <li className="mb-1">{details.checkIn}</li>}
                  {details.restaurantHours && <li>{details.restaurantHours}</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* --- COLONNE IMAGE (60% de la largeur) --- */}
        {/* Changement ici : col-lg-6 devient col-lg-7 */}
        <div className="col-lg-7">
          <img 
            src={imageSrc} 
            alt="Détail de la chambre" 
            className="w-100 h-100" 
            style={{ 
              objectFit: "cover", 
              minHeight: "500px", 
              // Optionnel : max-height pour éviter que ça soit trop grand sur les écrans géants
              maxHeight: "900px"  
            }} 
          />
        </div>
        
      </div>
    </section>
  );
};

export default FarihyRoomPresentationCard;