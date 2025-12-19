import { type FC } from "react";
import { useTranslation } from "react-i18next";
import "./ErrorState.css";

const ErrorState: FC = () => {
  const { t } = useTranslation();

  return <div className="error">{t("error")}</div>;
};

export default ErrorState;
