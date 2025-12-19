import { type FC } from "react";
import type { MarketData } from "../../../../types/market";
import "../SharedSection.css";

interface MarketInfoSectionProps {
  market: MarketData;
}

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem: FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="section-item">
      <span className="section-label">{label}</span>
      <span className="section-value">{value}</span>
    </div>
  );
};

const MarketInfoSection: FC<MarketInfoSectionProps> = ({ market }) => {
  return (
    <div className="section">
      <h2>Market Information</h2>
      <div className="section-grid">
        <InfoItem label="Base Currency" value={market.base_currency_symbol.en} />
        <InfoItem label="Quote Currency" value={market.quote_currency_symbol.en} />
        <InfoItem label="Amount Step" value={market.amount_step} />
        <InfoItem label="Price Step" value={market.price_step} />
      </div>
    </div>
  );
};

export default MarketInfoSection;
