import { type FC } from "react";
import { useTranslation } from "react-i18next";
import type { MarketData } from "../../../../types/market";
import "./StatsGrid.css";

interface StatsGridProps {
  market: MarketData;
  formatNumber: (value: string | number | undefined) => string;
}

const StatsGrid: FC<StatsGridProps> = ({ market, formatNumber }) => {
  const { t } = useTranslation();

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">{t("high")}</span>
        <span className="stat-value">{formatNumber(market.financial?.last24h?.highest)}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">{t("low")}</span>
        <span className="stat-value">{formatNumber(market.financial?.last24h?.lowest)}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">{t("volume")}</span>
        <span className="stat-value">{formatNumber(market.financial?.last24h?.quote_volume)}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">{t("buy")}</span>
        <span className="stat-value positive">{formatNumber(market.buy)}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">{t("sell")}</span>
        <span className="stat-value negative">{formatNumber(market.sell)}</span>
      </div>
    </div>
  );
};

export default StatsGrid;
