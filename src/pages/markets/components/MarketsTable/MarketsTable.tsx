import { type FC, useCallback, useEffect, useMemo } from "react";
import { List, useListRef } from "react-window";
import type { MarketData } from "../../../../types/market";
import TableHeader from "../TableHeader/TableHeader";
import MarketRow from "../MarketRow/MarketRow";
import "./MarketsTable.css";

type MarketsTableProps = {
  markets: MarketData[];
  sortBy: "name" | "price";
  sortOrder: "asc" | "desc";
  onSort: (field: "name" | "price") => void;
  onMarketClick: (urlName: string) => void;
  formatNumber: (value: string | number) => string;
};

const ITEM_HEIGHT = 80;

const MarketsTable: FC<MarketsTableProps> = ({
  markets,
  sortBy,
  sortOrder,
  onSort,
  onMarketClick,
  formatNumber,
}) => {
  const listRef = useListRef(null);
  const safeMarkets = useMemo(() => markets || [], [markets]);

  useEffect(() => {
    if (listRef.current && safeMarkets.length > 0) {
      listRef.current.scrollToRow({ index: 0 });
    }
  }, [sortBy, sortOrder, safeMarkets.length, listRef]);

  const Row = useCallback(
    (props: {
      ariaAttributes: {
        "aria-posinset": number;
        "aria-setsize": number;
        role: "listitem";
      };
      index: number;
      style: React.CSSProperties;
    }) => {
      const { index, style } = props;
      const market = safeMarkets[index];

      if (!market) return <div style={style} />;

      return (
        <MarketRow
          market={market}
          formatNumber={formatNumber}
          onMarketClick={onMarketClick}
          style={style}
        />
      );
    },
    [safeMarkets, formatNumber, onMarketClick],
  );

  return (
    <div className="markets-table">
      <TableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
      <div className="table-body-container">
        <List
          listRef={listRef}
          defaultHeight={window.innerHeight - 200}
          rowCount={safeMarkets.length}
          rowHeight={ITEM_HEIGHT}
          style={{ width: "100%" }}
          className="table-body-scroll"
          rowComponent={Row}
          rowProps={{}}
        />
      </div>
    </div>
  );
};

export default MarketsTable;
