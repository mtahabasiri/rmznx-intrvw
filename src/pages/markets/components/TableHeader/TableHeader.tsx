import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import "./TableHeader.css";

type TableHeaderProps = {
  sortBy: "name" | "price";
  sortOrder: "asc" | "desc";
  onSort: (field: "name" | "price") => void;
};

const TableHeader: FC<TableHeaderProps> = ({ sortBy, sortOrder, onSort }) => {
  const { t } = useTranslation();

  return (
    <div className="table-header">
      <div
        className={`header-cell sortable ${sortBy === "name" ? "active" : ""}`}
        onClick={() => onSort("name")}
      >
        {t("name")}
        {sortBy === "name" && (
          <span className="sort-indicator">
            {sortOrder === "asc" ? (
              <ArrowUp2 size={16} color="var(--text-primary)" />
            ) : (
              <ArrowDown2 size={16} color="var(--text-primary)" />
            )}
          </span>
        )}
      </div>
      <div
        className={`header-cell sortable ${sortBy === "price" ? "active" : ""}`}
        onClick={() => onSort("price")}
      >
        {t("price")}
        {sortBy === "price" && (
          <span className="sort-indicator">
            {sortOrder === "asc" ? (
              <ArrowUp2 size={16} color="var(--text-primary)" />
            ) : (
              <ArrowDown2 size={16} color="var(--text-primary)" />
            )}
          </span>
        )}
      </div>
      <div className="header-cell">{t("change")}</div>
    </div>
  );
};

export default TableHeader;
