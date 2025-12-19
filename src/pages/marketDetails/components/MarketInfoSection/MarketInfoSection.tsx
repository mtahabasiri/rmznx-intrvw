import { type FC } from "react";
import type { MarketData } from "../../../../types/market";
import "./MarketInfoSection.css";

interface MarketInfoSectionProps {
  market: MarketData;
}

const MarketInfoSection: FC<MarketInfoSectionProps> = ({ market }) => {
  return (
    <div className="market-info-section">
      <h2>Market Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Base Currency</span>
          <span className="info-value">{market.base_currency_symbol.en}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Quote Currency</span>
          <span className="info-value">{market.quote_currency_symbol.en}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Amount Step</span>
          <span className="info-value">{market.amount_step}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Price Step</span>
          <span className="info-value">{market.price_step}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketInfoSection;
