import { type FC } from "react";
import { useTranslation } from "react-i18next";
import type { MarketData } from "../../../../types/market";
import "../SharedSection.css";

interface FinancialSectionProps {
  market: MarketData;
  formatNumber: (value: string | number | undefined) => string;
}

interface FinancialItemProps {
  label: string;
  value: string | number | undefined;
  formatNumber: (value: string | number | undefined) => string;
}

const FinancialItem: FC<FinancialItemProps> = ({ label, value, formatNumber }) => {
  return (
    <div className="section-item">
      <span className="section-label">{label}</span>
      <span className="section-value">{formatNumber(value)}</span>
    </div>
  );
};

const FinancialSection: FC<FinancialSectionProps> = ({ market, formatNumber }) => {
  const { t } = useTranslation();

  if (!market.financial?.last24h) {
    return null;
  }

  const { last24h } = market.financial;

  return (
    <div className="section">
      <h2>{t("financial")}</h2>
      <div className="section-grid">
        <FinancialItem label={t("high")} value={last24h.highest} formatNumber={formatNumber} />
        <FinancialItem label={t("low")} value={last24h.lowest} formatNumber={formatNumber} />
        <FinancialItem
          label={`Base ${t("volume")}`}
          value={last24h.base_volume}
          formatNumber={formatNumber}
        />
        <FinancialItem
          label={`Quote ${t("volume")}`}
          value={last24h.quote_volume}
          formatNumber={formatNumber}
        />
        <FinancialItem label="Open" value={last24h.open} formatNumber={formatNumber} />
        <FinancialItem label="Close" value={last24h.close} formatNumber={formatNumber} />
      </div>
    </div>
  );
};

export default FinancialSection;
