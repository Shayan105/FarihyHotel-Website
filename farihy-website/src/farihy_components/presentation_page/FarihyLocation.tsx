import React from "react";
import { useTranslation } from "react-i18next";

const FarihyLocation = () => {
  // Lien Google Maps centré spécifiquement sur "Farihy Hotel, Ampefy"
  // Utilisation du mode &output=embed pour l'intégration sans clé API complexe
  const mapSrc = "https://maps.google.com/maps?q=Farihy+Hotel+Ampefy+Madagascar&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const {t} = useTranslation();

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    color: "#4a3728",
    fontWeight: 500,
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        
        {/* Titre de la section */}
        <div className="text-center mb-5">
          <h2 className="display-4" style={titleStyle}>
            {t('location.text_1')}
          </h2>
          <p className="lead text-muted" style={{ fontFamily: "serif", fontSize: "1.1rem" }}>
            {t('location.text_2')}
          </p>
        </div>

        {/* La Carte */}
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="shadow-lg" style={{ borderRadius: "20px", overflow: "hidden", height: "450px" }}>
              <iframe 
                src={mapSrc}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="Carte Farihy Hotel à Ampefy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FarihyLocation;