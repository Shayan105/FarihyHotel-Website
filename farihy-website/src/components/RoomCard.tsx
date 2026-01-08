import React from 'react';

// Define the shape of the props
interface RoomCardProps {
  minPax: number;
  maxPax: number;
  price: string | number; // String allows for "800 000", number allows for raw 800000
  imagePath: string;
  roomName: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  minPax, 
  maxPax, 
  price, 
  imagePath, 
  roomName 
}) => {
  
  // Styles
  const cardStyle: React.CSSProperties = {
    maxWidth: '500px',
    backgroundColor: '#F9F5F0',
    border: 'none',
    padding: '20px',
  };

  const contentBorderStyle: React.CSSProperties = {
    border: '1px solid #7D5A44',
    padding: '30px 25px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    color: '#5C3D2E',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'serif',
    letterSpacing: '0.5px',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    display: 'block',
    borderRadius: '0.375rem',
    objectFit: 'cover', // Ensures image covers area without distortion
    height: '300px'     // Fixed height to keep cards uniform
  };

  return (
    <div className="card shadow-sm" style={cardStyle}>
      {/* Dynamic Image */}
      <img 
        src={imagePath} 
        className="img-fluid" 
        alt={roomName} 
        style={imgStyle}
      />

      {/* Text area with the internal border */}
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

export default RoomCard;