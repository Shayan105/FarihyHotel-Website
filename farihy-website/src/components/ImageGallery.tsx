import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// 1. Import Autoplay module here
import { Autoplay, Pagination } from 'swiper/modules';
import VerticalPicture from './VerticalPicture';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import 'swiper/css';
import 'swiper/css/pagination';

interface ImageGalleryProps {
  title: string;
  subtitle: string;
  images: { path: string; alt?: string, focusPosition?: string }[];
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
  const [index, setIndex] = useState(-1);

  const serifStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    color: '#4a3728',
    textAlign: 'center',
  };

  return (
    <section className="w-100 py-5">
      <div className="mb-5">
        <h2 className="display-4" style={{ ...serifStyle, fontWeight: 500 }}>
          {title}
        </h2>
        <p className="mx-auto mt-3" style={{ ...serifStyle, maxWidth: '750px', fontSize: '1.2rem', opacity: 0.9 }}>
          {subtitle}
        </p>
      </div>

      <div className="container-fluid px-0">
        <Swiper
          // 2. Add Autoplay to the modules list
          modules={[Autoplay, Pagination]}
          
          // 3. Configure the auto-scroll settings
          autoplay={{
            delay: 5000, // 8 seconds
            disableOnInteraction: false, // Continues scrolling even after user swipes manually
            pauseOnMouseEnter: true, // (Optional) Stops scrolling while user hovers to click
          }}
          
          spaceBetween={30}
          slidesPerView={1}
          loop={images.length > 3}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-5"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="d-flex justify-content-center">
              <VerticalPicture
                imagePath={img.path}
                altText={img.alt || `Gallery image ${i + 1}`}
                ratio="4 / 5"
                maxWidth="100%"
                focusPosition={img.focusPosition}
                onClick={() => setIndex(i)} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.path, alt: img.alt }))} 
      />

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

      <style>{`
        .swiper-pagination-bullet-active {
          background: #4a3728 !important;
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;