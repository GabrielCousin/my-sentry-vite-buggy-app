import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      translation: {
        hello_world: "Hello, world!",
      },
    },
  },
});

export default i18n;
