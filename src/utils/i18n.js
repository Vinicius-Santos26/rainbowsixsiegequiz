import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTranslation from '../translations/pt.json';
import enTranslation from '../translations/en.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        quiz: ptTranslation,
      },
      en: {
        quiz: enTranslation,
      }
    },
    lng: 'pt',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      wait: true,
    },
  });

export default i18n;
