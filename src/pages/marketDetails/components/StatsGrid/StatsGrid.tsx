import { type FC } from "react";
import { useTranslation } from "react-i18next";
import type { MarketData } from "../../../../types/market";
import "./StatsGrid.css";

interface StatsGridProps {
  market: MarketData;
  formatNumber: (value: string | number | undefined) => string;
}

interface StatCardProps {
  label: string;
  value: string | number | undefined;
  formatNumber: (value: string | number | undefined) => string;
  variant?: "positive" | "negative";
}

const StatCard: FC<StatCardProps> = ({ label, value, formatNumber, variant }) => {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className={`stat-value ${variant || ""}`}>{formatNumber(value)}</span>
    </div>
  );
};

const StatsGrid: FC<StatsGridProps> = ({ market, formatNumber }) => {
  const { t } = useTranslation();

  return (
    <div className="stats-grid">
      <StatCard
        label={t("high")}
        value={market.financial?.last24h?.highest}
        formatNumber={formatNumber}
      />
      <StatCard
        label={t("low")}
        value={market.financial?.last24h?.lowest}
        formatNumber={formatNumber}
      />
      <StatCard
        label={t("volume")}
        value={market.financial?.last24h?.quote_volume}
        formatNumber={formatNumber}
      />
      <StatCard
        label={t("buy")}
        value={market.buy}
        formatNumber={formatNumber}
        variant="positive"
      />
      <StatCard
        label={t("sell")}
        value={market.sell}
        formatNumber={formatNumber}
        variant="negative"
      />
    </div>
  );
};

export default StatsGrid;
