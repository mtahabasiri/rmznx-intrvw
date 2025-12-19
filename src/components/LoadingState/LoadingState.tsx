import { type FC } from "react";
import { useTranslation } from "react-i18next";
import "./LoadingState.css";

const LoadingState: FC = () => {
  const { t } = useTranslation();

  return <div className="loading">{t("loading")}</div>;
};

export default LoadingState;
