import React from 'react';
import RoomGallery from '../../components/RoomGallery';
import {
  FamilialeCard,
  SuiteCard,
  DuplexCard,
  DoubleCard,
  VillaCard,
} from  '../../components/RoomCard';
import { useTranslation } from 'react-i18next';

const FarihyRoomGallery: React.FC = () => {
  const {t} = useTranslation();
  return (
    <RoomGallery title={t('galleries.room-home.title')}>
      
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