import { type FC } from "react";
import { useTranslation } from "react-i18next";
import "./NoResults.css";

const NoResults: FC = () => {
  const { t } = useTranslation();

  return <div className="no-results">{t("noResults")}</div>;
};

export default NoResults;
