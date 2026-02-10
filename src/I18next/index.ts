import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { projects: "Projects", cases: "Test Cases" } },
    ru: { translation: { projects: "Проекты", cases: "Тест-кейсы" } }
  },
  lng: "ru",
  fallbackLng: "en"
});

export default i18n;
