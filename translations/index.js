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
  if (!key) return '';
  
  const keyStr = String(key);
  const keys = keyStr.split('.');
  let value = translations[lang] || translations['RU'];
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      return keyStr;
    }
  }
  
  return value;
};

export function safeTranslate(lang, key) {
  if (!key) return '';
  
  const keyStr = String(key);
  
  if (keyStr.includes('.')) {
    const translation = getTranslation(lang, keyStr);
    if (translation !== keyStr) {
      return translation;
    }
  }
  
  return keyStr;
}

