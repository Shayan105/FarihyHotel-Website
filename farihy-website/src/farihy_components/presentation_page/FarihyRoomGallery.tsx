import React from 'react';
import RoomGallery from '../../components/RoomGallery';

// Importez vos images ici si elles sont dans src/assets
// import imgDouble from '../assets/pictures/chambres/double.jpg';
// import imgFamily from '../assets/pictures/chambres/famille.jpg';
// import imgSuite from '../assets/pictures/chambres/suite.jpg';

const FarihyRoomGallery: React.FC = () => {
  
  // Les données spécifiques à Farihy Hôtel
  const farihyRooms: RoomData[] = [
    {
      id: 1,
      minPax: 1,
      maxPax: 2,
      roomName: "Les Doubles",
      price: "400 000",
      // Remplacez par vos chemins réels ou les variables importées ci-dessus
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

  return (
    <RoomGallery 
      title="Nos hébergements" 
      rooms={farihyRooms} 
    />
  );
};

export default FarihyRoomGallery;