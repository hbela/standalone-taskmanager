// hooks/useTranslation.ts
import { useCallback, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import i18n from '../i18n';

/**
 * Custom hook for using translations in components
 * This hook ensures components re-render when the language changes
 */
export function useTranslation() {
  const { key } = useContext(LanguageContext);
  const t = useCallback((scope: string, options?: Record<string, unknown>) => {
    return i18n.t(scope, options);
  }, []);
  
  return {
    t,
    locale: i18n.locale,
    // Include the key to ensure components using this hook re-render on language change
    _key: key,
  };
}
