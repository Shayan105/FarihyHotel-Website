import React from 'react';

// --- 1. Interfaces ---
interface RoomData {
  id: number;
  minPax: number;
  maxPax: number;
  roomName: string;
  price: string;
  imagePath: string;
}

interface RoomCardProps {
  minPax: number;
  maxPax: number;
  price: string | number;
  imagePath: string;
  roomName: string;
  style?: React.CSSProperties; // Ajouté pour permettre de surcharger le style si besoin
}

// --- 2. La Source de Données (Data) ---
// Note: On l'exporte au cas où tu en aurais besoin ailleurs
export const farihyRooms: RoomData[] = [
  {
    id: 1,
    minPax: 1,
    maxPax: 2,
    roomName: "Les Doubles",
    price: "400 000",
    imagePath: "/src/assets/pictures/double/ext.jpg", 
  },
  {
    id: 2,
    minPax: 1,
    maxPax: 5,
    roomName: "Les Familiales",
    price: "425 000",
    imagePath: "/src/assets/pictures/familiale/ext.jpg",
  },
  {
    id: 3,
    minPax: 1,
    maxPax: 5,
    roomName: "La Suite",
    price: "750 000",
    imagePath: "/src/assets/pictures/suite/ext.jpg",
  },
  {
    id: 4,
    minPax: 1,
    maxPax: 6,
    roomName: "Les Duplex",
    price: "800 000",
    imagePath: "/src/assets/pictures/duplex/ext.jpg",
  },
  {
    id: 5,
    minPax: 1,
    maxPax: 10,
    roomName: "La Villa",
    price: "1 750 000",
    imagePath: "/src/assets/pictures/villa/ext.jpg",
  },
];

// --- 3. Le Composant de Base (UI) ---
export const RoomCard: React.FC<RoomCardProps> = ({ 
  minPax, 
  maxPax, 
  price, 
  imagePath, 
  roomName,
  style 
}) => {
  
  const cardStyle: React.CSSProperties = {
    width: '100%', 
    backgroundColor: '#F9F5F0',
    border: 'none',
    padding: '20px',
    boxSizing: 'border-box',
    ...style // Permet d'écraser les styles par défaut
  };

  const contentBorderStyle: React.CSSProperties = {
    border: '1px solid #7D5A44',
    padding: '30px 25px',
    display: 'flex',
    flexDirection: 'column',
    color: '#5C3D2E',
    height: 'auto',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'serif',
    letterSpacing: '0.5px',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    display: 'block',
    borderRadius: '0.375rem',
    objectFit: 'cover',
    height: '300px'
  };

  return (
    <div className="card shadow-sm" style={cardStyle}>
      <img src={imagePath} className="img-fluid" alt={roomName} style={imgStyle} />
      <div className="mt-3" style={contentBorderStyle}>
        <div className="mb-3">
          <p className="mb-0" style={{ ...textStyle, fontSize: '1.2rem', opacity: 0.8 }}>
            {minPax} à {maxPax} personnes
          </p>
        </div>
        <div className="mt-1">
          <h2 className="display-6 mb-1" style={{ ...textStyle, fontWeight: '500' }}>
            {roomName}
          </h2>
          <p className="mb-0" style={{ ...textStyle, fontSize: '1.1rem' }}>
            dès {price} Ariary la nuit
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 4. Les Composants Spécifiques Instanciables ---

// Helper pour trouver les data sans risque de crash si l'ID change
const getData = (id: number) => farihyRooms.find(r => r.id === id);

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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
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