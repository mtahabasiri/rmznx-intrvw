import { type FC } from "react";
import { useTranslation } from "react-i18next";
import type { MarketData } from "../../../../types/market";
import "./FinancialSection.css";

interface FinancialSectionProps {
  market: MarketData;
  formatNumber: (value: string | number | undefined) => string;
}

const FinancialSection: FC<FinancialSectionProps> = ({ market, formatNumber }) => {
  const { t } = useTranslation();

  if (!market.financial?.last24h) {
    return null;
  }

  return (
    <div className="financial-section">
      <h2>{t("financial")}</h2>
      <div className="financial-grid">
        <div className="financial-item">
          <span className="financial-label">{t("high")}</span>
          <span className="financial-value">{formatNumber(market.financial.last24h.highest)}</span>
        </div>
        <div className="financial-item">
          <span className="financial-label">{t("low")}</span>
          <span className="financial-value">{formatNumber(market.financial.last24h.lowest)}</span>
        </div>
        <div className="financial-item">
          <span className="financial-label">Base {t("volume")}</span>
          <span className="financial-value">
            {formatNumber(market.financial.last24h.base_volume)}
          </span>
        </div>
        <div className="financial-item">
          <span className="financial-label">Quote {t("volume")}</span>
          <span className="financial-value">
            {formatNumber(market.financial.last24h.quote_volume)}
          </span>
        </div>
        <div className="financial-item">
          <span className="financial-label">Open</span>
          <span className="financial-value">{formatNumber(market.financial.last24h.open)}</span>
        </div>
        <div className="financial-item">
          <span className="financial-label">Close</span>
          <span className="financial-value">{formatNumber(market.financial.last24h.close)}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSection;
