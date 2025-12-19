import { type FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLanguage } from "../store/slices/languageSlice";
import { useTranslation } from "react-i18next";
import "./LanguageToggle.css";

const LanguageToggle: FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const currentLanguage = useAppSelector((state) => state.language.current);

  const handleToggle = () => {
    const newLang = currentLanguage === "en" ? "fa" : "en";
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <button className="language-toggle" onClick={handleToggle} aria-label="Toggle language">
      {currentLanguage === "en" ? "FA" : "EN"}
    </button>
  );
};

export default LanguageToggle;
