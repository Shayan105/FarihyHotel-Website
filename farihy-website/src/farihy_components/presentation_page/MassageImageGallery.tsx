import React from "react";
import ImageGallery from "../../components/ImageGallery";
import { useTranslation } from "react-i18next";

/**
 * MassageGallery serves as the data provider for the
 * generic ImageGallery component.
 */
const MassageGallery: React.FC = () => {
  const { t } = useTranslation();
  const basePath = "/pictures/spa/";
  const massageContent = {
    title: t('galleries.massage.title'),
    subtitle: t('galleries.massage.subtitle'),
    images: [
      {
        path: basePath + "massage-1.webp",
        focusPosition: "",
      },
      {
        path: basePath + "massage-2-crop.webp",
        focusPosition: "65%",
      },
      {
        path: basePath + "massage-3.webp",
        focusPosition: "",
      },
    ],
  };

  return (
    <ImageGallery
      title={massageContent.title}
      subtitle={massageContent.subtitle}
      images={massageContent.images}
      footerTextPrefix={t('galleries.massage.footer.prefix')}
      footerLinkText={t('galleries.massage.footer.link')}
      ctaLink="/reservation"
      footerTextSuffix={t('galleries.massage.footer.suffix')}
    />
  );
};

export default MassageGallery;