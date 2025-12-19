const ROUTES = {
  markets: "/",
  marketDetails: (symbol?: string) => (symbol ? `/market/${symbol}` : "/market/:symbol"),
} as const;

export default ROUTES;
