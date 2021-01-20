import en from './en.json';
import ru from './ru.json';

const Languages = {
  en,
  ru
};

const Lang = (() => {
  let lang = localStorage.getItem('lang');
  if (lang == null) {
    const browserLanguage = navigator.language.slice(0, 2);
    localStorage.setItem('lang', browserLanguage);
    lang = browserLanguage;
  }
  return Languages[lang] || Languages.en;
})();

export {
  Lang as default,
  Languages
};
