import { type FC, memo } from "react";
import type { MarketData } from "../../../../types/market";
import "./MarketRow.css";

type MarketRowProps = {
  market: MarketData;
  formatNumber: (value: string | number) => string;
  onMarketClick: (urlName: string) => void;
  style: React.CSSProperties;
};

const MarketRow: FC<MarketRowProps> = ({ market, formatNumber, onMarketClick, style }) => {
  const changePercent = market.financial?.last24h?.change_percent ?? 0;

  return (
    <div className="table-row" style={style} onClick={() => onMarketClick(market.url_name)}>
      <div className="cell market-name">
        <div className="market-icon-container">
          <img
            src={market.logo}
            alt={market.base_currency_symbol.en}
            className="market-icon"
            loading="lazy"
          />
        </div>
        <div className="market-info">
          <span className="market-symbol">{market.url_name}</span>
          <span className="market-fullname">{market.name.en}</span>
        </div>
      </div>
      <div className="cell price">{formatNumber(market.sell)}</div>
      <div className={`cell change ${changePercent >= 0 ? "positive" : "negative"}`}>
        {changePercent >= 0 ? "+" : ""}
        {changePercent.toFixed(2)}%
      </div>
    </div>
  );
};

export default memo(MarketRow);
