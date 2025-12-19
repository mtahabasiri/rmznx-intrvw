const BASE_URL = "https://api.ramzinex.com/exchange/api/v1.0/exchange";

export const ENDPOINTS = {
  markets: `${BASE_URL}/pairs`,
  marketPrices: (pairId?: number) =>
    pairId ? `${BASE_URL}/pairs/${pairId}/price` : `${BASE_URL}/pairs/prices`,
  marketFinancial: (pairId?: number) =>
    pairId ? `${BASE_URL}/pairs/${pairId}/financial` : `${BASE_URL}/pairs/financial`,
} as const;
