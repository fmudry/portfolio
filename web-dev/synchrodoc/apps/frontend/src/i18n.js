import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
//import resourcesToBackend from 'i18next-resources-to-backend';  // for lazy loading

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "en",
    debug: true,
});

// i18n.changeLanguage("de")

export default i18n;
