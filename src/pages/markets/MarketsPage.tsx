import { type FC, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Scaffold from "../../components/layout/Scaffold";
import { useCustomQuery } from "../../utils/api/apiService";
import { ENDPOINTS } from "../../utils/api/endpoints";
import type { MarketsResponse } from "../../types/market";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSortBy, setSearchQuery } from "../../store/slices/marketSlice";
import ROUTES from "../../utils/router/routes";
import MarketsHeader from "./components/MarketsHeader/MarketsHeader";
import MarketsTable from "./components/MarketsTable/MarketsTable";
import LoadingState from "../../components/LoadingState/LoadingState";
import NoResults from "./components/NoResults/NoResults";
import "./MarketsPage.css";

const MarketsPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder, searchQuery } = useAppSelector((state) => state.market);

  const { data: marketsData, isLoading: marketsLoading } = useCustomQuery<MarketsResponse>(
    ENDPOINTS.markets,
    {
      refetchInterval: 20000,
      staleTime: 20000,
    },
  );

  const filteredAndSortedData = useMemo(() => {
    if (!marketsData?.data) return [];

    let result = [...marketsData.data];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (market) =>
          market.name.fa.toLowerCase().includes(query) ||
          market.name.en.toLowerCase().includes(query) ||
          market.url_name.toLowerCase().includes(query) ||
          market.base_currency_symbol.en.toLowerCase().includes(query) ||
          market.base_currency_symbol.fa.toLowerCase().includes(query) ||
          market.quote_currency_symbol.en.toLowerCase().includes(query) ||
          market.quote_currency_symbol.fa.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        const comparison = a.name.en.localeCompare(b.name.en);
        return sortOrder === "asc" ? comparison : -comparison;
      } else {
        const priceA = a.sell;
        const priceB = b.sell;
        const comparison = priceA - priceB;
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });

    return result;
  }, [marketsData, searchQuery, sortBy, sortOrder]);

  const handleSort = (field: "name" | "price") => {
    dispatch(setSortBy(field));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleMarketClick = useCallback(
    (urlName: string) => {
      navigate(ROUTES.marketDetails(urlName));
    },
    [navigate],
  );

  const formatNumber = useCallback((value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "0";
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 8,
      minimumFractionDigits: 2,
    }).format(num);
  }, []);

  return (
    <Scaffold title={t("markets")}>
      <Scaffold.Header>
        <MarketsHeader searchQuery={searchQuery} onSearchChange={handleSearch} />
      </Scaffold.Header>
      <Scaffold.Body>
        <div className="markets-container">
          {marketsLoading ? (
            <LoadingState />
          ) : (
            <>
              <MarketsTable
                markets={filteredAndSortedData}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
                onMarketClick={handleMarketClick}
                formatNumber={formatNumber}
              />
              {filteredAndSortedData.length === 0 && !marketsLoading && <NoResults />}
            </>
          )}
        </div>
      </Scaffold.Body>
    </Scaffold>
  );
};

export default MarketsPage;
