import { type FC } from "react";
import { useTranslation } from "react-i18next";
import type { MarketData } from "../../../../types/market";
import "./PriceSection.css";

interface PriceSectionProps {
  market: MarketData;
  formatNumber: (value: string | number | undefined) => string;
}

const PriceSection: FC<PriceSectionProps> = ({ market, formatNumber }) => {
  const { t } = useTranslation();
  const changePercent = market.financial?.last24h?.change_percent ?? 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="price-section">
      <div className="current-price">
        <span className="label">{t("price")}</span>
        <span className="value">{formatNumber(market.sell)}</span>
      </div>
      <div className={`price-change ${isPositive ? "positive" : "negative"}`}>
        {isPositive ? "+" : ""}
        {changePercent.toFixed(2)}%
      </div>
    </div>
  );
};

export default PriceSection;
