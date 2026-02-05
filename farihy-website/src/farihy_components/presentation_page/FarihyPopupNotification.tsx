import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const FarihyPopupNotification = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    // Start date: Jan 27 (Month is 0-indexed, so 0 = Jan)
    const startDate = new Date(now.getFullYear(), 0, 27); 
    // End date: March 1st (23:59:59)
    const endDate = new Date(now.getFullYear(), 2, 1, 23, 59, 59);

    if (now >= startDate && now <= endDate) {
      // Check if user already dismissed it this session
      const isDismissed = sessionStorage.getItem("farihy_notif_dismissed");
      if (!isDismissed) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("farihy_notif_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center" 
         style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      
      <div className="bg-white p-4 p-md-5 rounded shadow-lg text-center mx-3" style={{ maxWidth: "500px" }}>
        
        {/* Language Switcher moved to standard flow (flexbox) to prevent collision */}
        <div className="d-flex justify-content-end mb-2">
          <LanguageSwitcher />
        </div>

        <h3 className="mb-4 text-uppercase fw-bold" style={{ color: "#d4a373" }}>
          {t('popup.title')}
        </h3>
        
        <div className="text-muted mb-4" style={{ lineHeight: "1.6" }}>
          <p>{t('popup.greeting')}</p>
          <p>
            <Trans i18nKey="popup.message_closed">
              Nous vous informons que nous sommes fermés pour congé annuel du <strong>27 janvier au 1er mars inclus</strong>.
            </Trans>
          </p>
          <p>
            <Trans i18nKey="popup.message_contact">
              Notre ligne téléphonique ne sera pas disponible durant cette période mais nous restons toutefois à votre disposition par <strong>e-mail et sur WhatsApp</strong>.
            </Trans>
          </p>
          <p>
            {t('popup.closing')}<br />
            <strong>{t('popup.team')}</strong>
          </p>
        </div>

        <button 
          onClick={handleClose}
          className="btn btn-dark px-5 py-2 fw-bold"
          style={{ borderRadius: "30px", backgroundColor: "#333" }}
        >
          {t('popup.button')}
        </button>
      </div>
    </div>
  );
};

export default FarihyPopupNotification;