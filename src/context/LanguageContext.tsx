'use client';

import React, { createContext, useContext } from 'react';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'es',
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  value: LanguageContextType;
  children: React.ReactNode;
}

export function LanguageProvider({ value, children }: LanguageProviderProps) {
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}