import { langToLang } from "language-name-to-language-name";

const languageCode = {};

export const convertLanguage = (code) => {
  const language = code;
  return langToLang(language);
};
