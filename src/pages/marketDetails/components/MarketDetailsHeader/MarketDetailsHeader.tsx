import { type FC } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useAppSelector } from "../../../../store/hooks";
import type { MarketData } from "../../../../types/market";
import "./MarketDetailsHeader.css";

interface MarketDetailsHeaderProps {
  market?: MarketData;
  title: string;
}

const MarketDetailsHeader: FC<MarketDetailsHeaderProps> = ({ market, title }) => {
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.language.current);
  const isRTL = language === "fa";
  const ArrowIcon = isRTL ? ArrowRight2 : ArrowLeft2;

  return (
    <div className="details-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowIcon size={20} color="var(--text-primary)" />
      </button>
      {market ? (
        <div className="header-content">
          <div className="market-icons">
            <img src={market.logo} alt={market.base_currency_symbol.en} className="market-icon" />
          </div>
          <div className="header-info">
            <h1>{market.url_name}</h1>
            <span className="market-name">{market.name.en}</span>
          </div>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </div>
  );
};

export default MarketDetailsHeader;
