import { type FC, useMemo } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Scaffold from "../../components/layout/Scaffold";
import { useCustomQuery } from "../../utils/api/apiService";
import { ENDPOINTS } from "../../utils/api/endpoints";
import type { MarketsResponse } from "../../types/market";
import MarketDetailsHeader from "./components/MarketDetailsHeader/MarketDetailsHeader";
import PriceSection from "./components/PriceSection/PriceSection";
import StatsGrid from "./components/StatsGrid/StatsGrid";
import FinancialSection from "./components/FinancialSection/FinancialSection";
import MarketInfoSection from "./components/MarketInfoSection/MarketInfoSection";
import LoadingState from "../../components/LoadingState/LoadingState";
import ErrorState from "./components/ErrorState/ErrorState";
import "./MarketDetailsPage.css";

const MarketDetailsPage: FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { t } = useTranslation();

  const { data: marketsData, isLoading: marketsLoading } = useCustomQuery<MarketsResponse>(
    ENDPOINTS.markets,
    {
      refetchInterval: 20000,
      staleTime: 20000,
    },
  );

  const market = useMemo(() => {
    if (!marketsData?.data || !symbol) return undefined;
    return marketsData.data.find((m) => m.url_name === symbol);
  }, [marketsData, symbol]);

  const isLoading = marketsLoading;

  const formatNumber = (value: string | number | undefined) => {
    if (!value) return "0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "0";
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 8,
      minimumFractionDigits: 2,
    }).format(num);
  };

  if (isLoading) {
    return (
      <Scaffold title={t("loading")}>
        <Scaffold.Header>
          <MarketDetailsHeader title={t("loading")} />
        </Scaffold.Header>
        <Scaffold.Body>
          <LoadingState />
        </Scaffold.Body>
      </Scaffold>
    );
  }

  if (!market) {
    return (
      <Scaffold title={t("error")}>
        <Scaffold.Header>
          <MarketDetailsHeader title={t("error")} />
        </Scaffold.Header>
        <Scaffold.Body>
          <ErrorState />
        </Scaffold.Body>
      </Scaffold>
    );
  }

  return (
    <Scaffold title={market.name.en}>
      <Scaffold.Header>
        <MarketDetailsHeader market={market} title={market.name.en} />
      </Scaffold.Header>
      <Scaffold.Body>
        <div className="details-container">
          <PriceSection market={market} formatNumber={formatNumber} />
          <StatsGrid market={market} formatNumber={formatNumber} />
          <FinancialSection market={market} formatNumber={formatNumber} />
          <MarketInfoSection market={market} />
        </div>
      </Scaffold.Body>
    </Scaffold>
  );
};

export default MarketDetailsPage;
