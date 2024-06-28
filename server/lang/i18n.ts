import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import { LanguageDetector } from "i18next-express-middleware";
import path from "path";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
    },
    fallbackLng: "en",
    preload: ["en", "am"], // Preload English and Amharic
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"],
    },
  });

export default i18next;
