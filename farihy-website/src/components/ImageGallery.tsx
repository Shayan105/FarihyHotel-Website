import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import VerticalPicture from './VerticalPicture';

// Import des styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';

interface ImageGalleryProps {
  title: string;
  subtitle: string;
  images: { path: string; alt?: string }[];
  footerTextPrefix?: string;
  footerLinkText?: string;
  footerTextSuffix?: string;
  ctaLink?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  title,
  subtitle,
  images,
  footerTextPrefix,
  footerLinkText,
  footerTextSuffix,
  ctaLink,
}) => {
  const serifStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    color: '#4a3728',
    textAlign: 'center',
  };

  return (
    <section className="w-100 py-5">
      {/* Header */}
      <div className="mb-5">
        <h2 className="display-4" style={{ ...serifStyle, fontWeight: 500 }}>
          {title}
        </h2>
        <p className="mx-auto mt-3" style={{ ...serifStyle, maxWidth: '750px', fontSize: '1.2rem', opacity: 0.9 }}>
          {subtitle}
        </p>
      </div>

      {/* Slider Section */}
      <div className="container-fluid px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1} // Par défaut pour mobile
          loop={images.length > 3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            // Configuration adaptative (Responsive)
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }, // Affiche 3 images comme sur votre maquette
          }}
          className="pb-5"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="d-flex justify-content-center">
              <VerticalPicture
                imagePath={img.path}
                altText={img.alt || `Gallery image ${index + 1}`}
                ratio="4 / 5"
                maxWidth="100%"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      {(footerTextPrefix || footerLinkText) && (
        <div className="mt-4">
          <p className="mx-auto" style={{ ...serifStyle, maxWidth: '750px', fontSize: '1.2rem' }}>
            {footerTextPrefix}{' '}
            {footerLinkText && ctaLink && (
              <a href={ctaLink} style={{ color: '#4a3728', fontWeight: 700, textDecoration: 'underline' }}>
                {footerLinkText}
              </a>
            )}{' '}
            {footerTextSuffix}
          </p>
        </div>
      )}

      {/* Style pour personnaliser les points de pagination aux couleurs du thème */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #4a3728 !important;
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;