import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface RoomGalleryProps {
  title?: string;
  // This accepts any React elements (RoomCards, divs, etc.)
  children: React.ReactNode; 
}

const RoomGallery: React.FC<RoomGalleryProps> = ({ 
  title = "Nos hébergements", 
  children 
}) => {
  
  // Convert children to an array to map over them easily
  const cards = React.Children.toArray(children);

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
          {cards.map((card, index) => (
            <div key={index} className="col-xl-4 d-flex justify-content-center">
              {/* Wrapper to ensure the card takes full height/width of the column */}
              <div className="w-100">
                {card}
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
            }}
            className="pb-5 px-4"
          >
            {cards.map((card, index) => (
              // SwiperSlide requires specific keys and classes
              <SwiperSlide key={index} className="d-flex justify-content-center h-auto">
                <div className="h-100 w-100"> 
                  {card}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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