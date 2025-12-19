import { type FC } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../../../../components/ThemeToggle";
import LanguageToggle from "../../../../components/LanguageToggle";
import "./MarketsHeader.css";

type MarketsHeaderProps = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MarketsHeader: FC<MarketsHeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { t } = useTranslation();

  return (
    <div className="markets-header">
      <div className="header-top">
        <h1>{t("markets")}</h1>
        <div className="header-controls">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder={t("search")}
          value={searchQuery}
          onChange={onSearchChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default MarketsHeader;
