import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const btnStyle = (lng: string) => ({
    fontWeight: i18n.language.startsWith(lng) ? 'bold' : 'normal',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#5A4D41', // Matches your header color
    padding: '0 5px'
  });

  return (
    <div className="d-flex align-items-center ms-3">
      <button onClick={() => changeLanguage('fr')} style={btnStyle('fr')}>FR</button>
      <span>|</span>
      <button onClick={() => changeLanguage('en')} style={btnStyle('en')}>EN</button>
      <span>|</span>
      <button onClick={() => changeLanguage('mg')} style={btnStyle('mg')}>MG</button>
    </div>
  );
}