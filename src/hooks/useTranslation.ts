import i18n from 'i18next'; // Importa i18next
import { useEffect, useState } from 'react';

const useTranslation = () => {
  const supportedLocales = ['en', 'it'] as const;
  const defaultLocale = 'en';

  const isLocaleSupported = (locale: string) =>
    supportedLocales.includes(locale as (typeof supportedLocales)[number]);

  const [currentLocale, setCurrentLocale] = useState(defaultLocale);

  const getPersistedLocale = (): string | null => {
    const persistedLocale = localStorage.getItem('user-locale');
    return persistedLocale && isLocaleSupported(persistedLocale)
      ? persistedLocale
      : null;
  };

  const getUserPreferredLocale = (): string | null => {
    const locale = window.navigator.language || defaultLocale;
    const localeNoRegion = locale.split('-')[0];

    if (isLocaleSupported(locale)) {
      return locale;
    }
    if (isLocaleSupported(localeNoRegion)) {
      return localeNoRegion;
    }
    return null;
  };

  useEffect(() => {
    const initialLocale =
      getPersistedLocale() || getUserPreferredLocale() || defaultLocale;
    setCurrentLocale(initialLocale);
    i18n.changeLanguage(initialLocale); // Informa i18next della lingua iniziale
  }, []);

  const switchLanguage = (newLocale: string) => {
    if (isLocaleSupported(newLocale)) {
      setCurrentLocale(newLocale);
      localStorage.setItem('user-locale', newLocale);
      i18n.changeLanguage(newLocale); // Cambia la lingua anche in i18next
    } else {
      console.warn(`Locale ${newLocale} is not supported.`);
    }
  };

  const i18nRoute = (to: any) => {
    return {
      ...to,
      params: {
        locale: currentLocale,
        ...to.params,
      },
    };
  };

  return {
    supportedLocales,
    currentLocale,
    switchLanguage,
    isLocaleSupported,
    i18nRoute,
  };
};

export default useTranslation;
