import React from "react";
// removed "react-router-dom" import since we want a full refresh

// --- 1. Interfaces ---
interface RoomData {
  id: number;
  minPax: number;
  maxPax: number;
  roomName: string;
  price: string;
  imagePath: string;
  link: string;
}

interface RoomCardProps {
  minPax: number;
  maxPax: number;
  price: string | number;
  imagePath: string;
  roomName: string;
  link: string;
  style?: React.CSSProperties;
}

// --- 2. La Source de Données (Data) ---
export const farihyRooms: RoomData[] = [
  {
    id: 1,
    minPax: 1,
    maxPax: 2,
    roomName: "Les Doubles",
    price: "400 000",
    imagePath: "/src/assets/pictures/double/ext.webp",
    link: "/double",
  },
  {
    id: 2,
    minPax: 1,
    maxPax: 5,
    roomName: "Familiales",
    price: "425 000",
    imagePath: "/src/assets/pictures/familiale/ext.webp",
    link: "/familiale",
  },
  {
    id: 3,
    minPax: 1,
    maxPax: 5,
    roomName: "La Suite",
    price: "750 000",
    imagePath: "/src/assets/pictures/suite/ext.webp",
    link: "/suite",
  },
  {
    id: 4,
    minPax: 1,
    maxPax: 6,
    roomName: "Les Duplex",
    price: "800 000",
    imagePath: "/src/assets/pictures/duplex/ext.webp",
    link: "/duplex",
  },
  {
    id: 5,
    minPax: 1,
    maxPax: 10,
    roomName: "La Villa",
    price: "1 750 000",
    imagePath: "/src/assets/pictures/villa/ext.webp",
    link: "/villa",
  },
];

// --- 3. Le Composant de Base (UI) ---
export const RoomCard: React.FC<RoomCardProps> = ({
  minPax,
  maxPax,
  price,
  imagePath,
  roomName,
  link,
  style,
}) => {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#F9F5F0",
    border: "none",
    padding: "20px",
    boxSizing: "border-box",
    transition: "transform 0.2s ease",
    ...style,
  };

  const contentBorderStyle: React.CSSProperties = {
    border: "1px solid #7D5A44",
    padding: "30px 25px",
    display: "flex",
    flexDirection: "column",
    color: "#5C3D2E",
    height: "auto",
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
    // Changed back to standard <a> tag to ensure full page refresh
    <a href={link} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card shadow-sm h-100" style={cardStyle}>
        <img
          src={imagePath}
          className="img-fluid"
          alt={roomName}
          style={imgStyle}
          // Keeps the lazy loading
          loading="lazy"
          decoding="async"
        />
        <div className="mt-3" style={contentBorderStyle}>
          <div className="mb-3">
            <p
              className="mb-0"
              style={{ ...textStyle, fontSize: "1.2rem", opacity: 0.8 }}
            >
              {minPax} à {maxPax} personnes
            </p>
          </div>
          <div className="mt-1">
            <h2
              className="display-6 mb-1"
              style={{ ...textStyle, fontWeight: "500" }}
            >
              {roomName}
            </h2>
            <p className="mb-0" style={{ ...textStyle, fontSize: "1.1rem" }}>
              dès {price} Ariary la nuit
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- 4. Les Composants Spécifiques Instanciables ---

const getData = (id: number) => farihyRooms.find((r) => r.id === id);

export const DoubleCard = () => {
  const data = getData(1);
  return data ? <RoomCard {...data} /> : null;
};

export const FamilialeCard = () => {
  const data = getData(2);
  return data ? <RoomCard {...data} /> : null;
};

export const SuiteCard = () => {
  const data = getData(3);
  return data ? <RoomCard {...data} /> : null;
};

export const DuplexCard = () => {
  const data = getData(4);
  return data ? <RoomCard {...data} /> : null;
};

export const VillaCard = () => {
  const data = getData(5);
  return data ? <RoomCard {...data} /> : null;
};

// --- 5. La Liste Complète (Grid) ---

export const FarihyRoomList: React.FC = () => {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    padding: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",
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