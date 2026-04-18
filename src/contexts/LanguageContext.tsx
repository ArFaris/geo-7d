import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import ruTranslations from 'locales/ru.json';
import enTranslations from 'locales/en.json';

type Locale = 'ru' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: ruTranslations,
  en: enTranslations
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved === 'en' ? 'en' : 'ru') as Locale;
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
