import ru from './ru.json';
import en from './en.json';
import uz from './uz.json';
import tr from './tr.json';

export const translations = {
  RU: ru,
  EN: en,
  UZ: uz,
  TR: tr,
};

export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang] || translations['RU'];
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      return key; // Fallback to key if translation not found
    }
  }
  
  return value;
};

