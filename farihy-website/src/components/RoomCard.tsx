import React from "react";
import { useTranslation } from "react-i18next";

// --- 1. Interfaces ---
interface RoomData {
  id: number;
  minPax: number;
  maxPax: number;
  titleKey: string;
  price: string;
  imagePath: string;
  link: string;
}

interface RoomCardProps {
  minPax: number;
  maxPax: number;
  price: string | number;
  imagePath: string;
  titleKey: string;
  link: string;
  style?: React.CSSProperties; // Le style est autorisé ici
}

// --- 2. La Source de Données ---
export const farihyRooms: RoomData[] = [
  {
    id: 1,
    minPax: 1,
    maxPax: 2,
    titleKey: "nav.doubles", 
    price: "400 000",
    imagePath: "/pictures/double/ext.webp",
    link: "/double",
  },
  {
    id: 2,
    minPax: 1,
    maxPax: 5,
    titleKey: "nav.familials",
    price: "425 000",
    imagePath: "/pictures/familiale/ext.webp",
    link: "/familiale",
  },
  {
    id: 3,
    minPax: 1,
    maxPax: 5,
    titleKey: "nav.suite",
    price: "750 000",
    imagePath: "/pictures/suite/ext.webp",
    link: "/suite",
  },
  {
    id: 4,
    minPax: 1,
    maxPax: 6,
    titleKey: "nav.duplex",
    price: "800 000",
    imagePath: "/pictures/duplex/ext.webp",
    link: "/duplex",
  },
  {
    id: 5,
    minPax: 1,
    maxPax: 10,
    titleKey: "nav.villa",
    price: "1 750 000",
    imagePath: "/pictures/villa/ext.webp",
    link: "/villa",
  },
];

// --- 3. Le Composant de Base (UI) ---
export const RoomCard: React.FC<RoomCardProps> = ({
  minPax,
  maxPax,
  price,
  imagePath,
  titleKey,
  link,
  style,
}) => {
  const { t } = useTranslation();

  const cardStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#F9F5F0",
    border: "none",
    padding: "20px",
    boxSizing: "border-box",
    transition: "transform 0.2s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%", // La carte prend toute la hauteur disponible
    ...style,
  };

  const contentBorderStyle: React.CSSProperties = {
    border: "1px solid #7D5A44",
    padding: "30px 25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Aligne le texte en haut
    color: "#5C3D2E",
    flex: 1, // Le contenu remplit l'espace restant
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "serif",
    letterSpacing: "0.5px",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    display: "block",
    borderRadius: "0.375rem",
    objectFit: "cover",
    height: "300px",
  };

  return (
    <a 
      href={link} 
      style={{ 
        textDecoration: "none", 
        color: "inherit", 
        display: "flex",        // Important pour la hauteur uniforme
        flexDirection: "column",
        height: "100%"          // Le lien prend toute la hauteur de la grille
      }}
    >
      <div className="card shadow-sm" style={cardStyle}>
        <img
          src={imagePath}
          className="img-fluid"
          alt={t(titleKey)}
          style={imgStyle}
          loading="lazy"
          decoding="async"
        />
        <div className="mt-3" style={contentBorderStyle}>
          <div className="mb-3">
            <p
              className="mb-0"
              style={{ ...textStyle, fontSize: "1.2rem", opacity: 0.8 }}
            >
              {t("room_card.capacity", { min: minPax, max: maxPax })}
            </p>
          </div>
          <div className="mt-1">
            <h2
              className="display-6 mb-1"
              style={{ ...textStyle, fontWeight: "500" }}
            >
              {t(titleKey)}
            </h2>
            <p className="mb-0" style={{ ...textStyle, fontSize: "1.1rem" }}>
              {t("room_card.from_price", { price: price })}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- 4. Les Composants Spécifiques Instanciables ---
// C'est ICI que l'erreur TypeScript est corrigée : on accepte les props (style)
const getData = (id: number) => farihyRooms.find((r) => r.id === id);

export const DoubleCard = (props: { style?: React.CSSProperties }) => {
  const data = getData(1);
  return data ? <RoomCard {...data} {...props} /> : null;
};

export const FamilialeCard = (props: { style?: React.CSSProperties }) => {
  const data = getData(2);
  return data ? <RoomCard {...data} {...props} /> : null;
};

export const SuiteCard = (props: { style?: React.CSSProperties }) => {
  const data = getData(3);
  return data ? <RoomCard {...data} {...props} /> : null;
};

export const DuplexCard = (props: { style?: React.CSSProperties }) => {
  const data = getData(4);
  return data ? <RoomCard {...data} {...props} /> : null;
};

export const VillaCard = (props: { style?: React.CSSProperties }) => {
  const data = getData(5);
  return data ? <RoomCard {...data} {...props} /> : null;
};

// --- 5. La Liste Complète (Grid Responsive) ---
export const FarihyRoomList: React.FC = () => {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    // Responsive: min 280px par carte. Sur iPad, cela fera 2 colonnes.
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "20px",
    padding: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "stretch", // Force tous les éléments d'une ligne à avoir la même hauteur
  };

  return (
    <div style={gridStyle}>
      {farihyRooms.map((room) => (
        <RoomCard key={room.id} {...room} />
      ))}
    </div>
  );
};

export default FarihyRoomList;