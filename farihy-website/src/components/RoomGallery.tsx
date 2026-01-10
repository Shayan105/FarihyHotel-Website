import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// 1. Import Autoplay module
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface RoomGalleryProps {
  title?: string;
  children: React.ReactNode; 
}

const RoomGallery: React.FC<RoomGalleryProps> = ({ 
  title = "Nos hébergements", 
  children 
}) => {
  
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
        
        <h2 className="display-4" style={titleStyle}>
          {title}
        </h2>

        {/* Desktop View */}
        <div className="d-none d-xl-flex row justify-content-center g-4">
          {cards.map((card, index) => (
            <div key={index} className="col-xl-4 d-flex justify-content-center">
              <div className="w-100">
                {card}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet View (Swiper) */}
        <div className="d-block d-xl-none">
          <Swiper
            // 2. Add Autoplay to modules list
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            // 3. Configure Autoplay
            autoplay={{
              delay: 3000, // 3 seconds
              disableOnInteraction: false, // Continue autoplay even after user touches it
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="pb-5 px-4"
          >
            {cards.map((card, index) => (
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