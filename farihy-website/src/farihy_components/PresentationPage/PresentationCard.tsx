import React from "react";

interface PresentationCardProps {
  imageSrc?: string;
  title?: string;
  paragraphs?: string[];
  reversed?: boolean; // Pour mettre l'image à droite si besoin
}

const PresentationCard: React.FC<PresentationCardProps> = ({
  imageSrc = "/src/assets/pictures/accueil/pirogue.jpg",
  title = "Le calme à 120km d'Antananarivo",
  paragraphs = [
    "Découvrez votre havre de tranquillité au cœur d'Ampefy.",
    "Notre hôtel vous invite à un séjour alliant détente, nature et authenticité.",
    "Profitez d'un cadre paisible en face du lac Itasy pour un moment de bien-être."
  ],
  reversed = false,
}) => {
  
  const brandStyle = {
    color: "#4a3728",
    fontFamily: "'Playfair Display', serif"
  };

  return (
    // 'container-fluid p-0' permet d'aller de bord à bord (full width)
    <section className="container-fluid p-0 overflow-hidden">
      
      {/* 'g-0' supprime les gouttières (espaces) entre l'image et le texte */}
      {/* 'min-vh-100' force la section à prendre au moins toute la hauteur de l'écran */}
      <div className={`row g-0 min-vh-100 ${reversed ? "flex-row-reverse" : ""}`}>
        
        {/* COLONNE IMAGE : Prend 50% de la largeur sur grand écran */}
        <div className="col-lg-6">
          <img 
            src={imageSrc} 
            alt="Vue panoramique" 
            className="w-100 h-100 object-fit-cover" 
            style={{ minHeight: "400px" }} // Sécurité pour mobile
          />
        </div>

        {/* COLONNE TEXTE : Centrée verticalement et horizontalement */}
        <div className="col-lg-6 d-flex align-items-center">
          <div className="p-5 mx-lg-5 text-center">
            <h2 
              className="display-3 fw-normal mb-5" 
              style={brandStyle}
            >
              {title}
            </h2>

            {paragraphs.map((text, index) => (
              <p 
                key={index} 
                className="mb-4 fs-4 fw-light" // fs-4 = texte plus grand pour l'effet présentation
                style={{ ...brandStyle, opacity: 0.9, lineHeight: "1.8" }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default PresentationCard;