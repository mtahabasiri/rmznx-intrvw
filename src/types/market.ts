export interface MarketData {
  sell: number;
  buy: number;
  pair_id: number;
  name: Name;
  icon: string;
  logo: string;
  web_link: string;
  base_precision: number;
  quote_precision: number;
  base_currency_id: number;
  base_currency_symbol: Name;
  quote_currency_id: number;
  quote_currency_symbol: Name;
  financial: Financial;
  price_step: number;
  amount_step: number;
  tv_symbol: Tvsymbol;
  show_order: number;
  url_name: string;
  crypto_box: number;
  price_precision: number;
  is_delist: number;
  is_temporarily_suspended: number;
}

interface Tvsymbol {
  ramzinex: string;
  international: string;
  charts: unknown[];
}

interface Financial {
  last24h: Last24h;
}

interface Last24h {
  open: number;
  close: number;
  highest: number;
  lowest: number;
  quote_volume: number;
  base_volume: number;
  change_percent: number;
}

interface Name {
  fa: string;
  en: string;
}
export interface MarketsResponse {
  status: number;
  data: MarketData[];
}
