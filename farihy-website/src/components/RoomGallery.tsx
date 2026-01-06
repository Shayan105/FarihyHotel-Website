import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import RoomCard from '../components/RoomCard';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface RoomData {
  id: string | number;
  minPax: number;
  maxPax: number;
  price: string | number;
  imagePath: string;
  roomName: string;
}

interface RoomGalleryProps {
  title?: string;
  rooms: RoomData[];
}

const RoomGallery: React.FC<RoomGalleryProps> = ({ 
  title = "Nos hébergements", 
  rooms 
}) => {
  
  const titleStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    color: '#4a3728',
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: 500,
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#efebe5' }}>
      <div className="container">
        
        {/* Section Title */}
        <h2 className="display-4" style={titleStyle}>
          {title}
        </h2>

        {/* =========================================
            VIEW 1: DESKTOP GRID (Wide Screens) 
            Visible only on XL screens (>= 1200px)
           ========================================= */}
        <div className="d-none d-xl-flex row justify-content-center g-4">
          {rooms.map((room) => (
            // col-xl-4 means 3 cards per row (12 columns / 4 = 3)
            // d-flex aligns items stretch so all cards are same height
            <div key={room.id} className="col-xl-4 d-flex justify-content-center">
              <div className="w-100">
                <RoomCard
                  minPax={room.minPax}
                  maxPax={room.maxPax}
                  price={room.price}
                  imagePath={room.imagePath}
                  roomName={room.roomName}
                />
              </div>
            </div>
          ))}
        </div>

        {/* =========================================
            VIEW 2: SWIPER SLIDER (Mobile/Tablet) 
            Hidden on XL screens (>= 1200px)
           ========================================= */}
        <div className="d-block d-xl-none">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              // We don't need the 1200 breakpoint here anymore 
              // because this entire Swiper div hides at 1200px
            }}
            className="pb-5 px-4"
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id} className="d-flex justify-content-center h-auto">
                <div className="h-100 w-100"> 
                  <RoomCard
                    minPax={room.minPax}
                    maxPax={room.maxPax}
                    price={room.price}
                    imagePath={room.imagePath}
                    roomName={room.roomName}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Styles specific to Swiper */}
        <style>{`
          .swiper-pagination-bullet-active {
            background-color: #4a3728 !important;
          }
          .swiper-button-next, .swiper-button-prev {
            color: #4a3728 !important;
          }
          .swiper-slide {
            height: auto !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default RoomGallery;