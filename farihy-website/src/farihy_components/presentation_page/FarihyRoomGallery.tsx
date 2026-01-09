import React from 'react';
import RoomGallery from '../../components/RoomGallery';
import {
  FamilialeCard,
  SuiteCard,
  DuplexCard,
  DoubleCard,
  VillaCard,
} from  '../../components/RoomCard';

const FarihyRoomGallery: React.FC = () => {
  return (
    <RoomGallery title="Nos hébergements">
      
      {/* Since RoomGallery now accepts "children", 
         we simply list the components here. 
         The Gallery will handle the Grid/Slider layout automatically.
      */}
      
      <DoubleCard />
      <FamilialeCard />
      <SuiteCard />
      <DuplexCard />
      <VillaCard />

    </RoomGallery>
  );
};

export default FarihyRoomGallery;