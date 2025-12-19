import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";
import ROUTES from "./routes";

const Markets = lazy(() => import("../../pages/markets/MarketsPage"));
const MarketDetails = lazy(() => import("../../pages/marketDetails/MarketDetailsPage"));

const appRoutes: RouteObject[] = [
  {
    path: ROUTES.markets,
    element: <Markets />,
  },
  {
    path: ROUTES.marketDetails(),
    element: <MarketDetails />,
  },
];

const router = createBrowserRouter(appRoutes);

export default router;
