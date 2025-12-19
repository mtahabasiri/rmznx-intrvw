import { type FC, Suspense, useEffect } from "react";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { store } from "./store";
import router from "./utils/router/router";
import i18n from "./providers/i18n";
import { useAppSelector } from "./store/hooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      staleTime: 20000,
      gcTime: 300000,
    },
  },
});

const AppContent: FC = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const language = useAppSelector((state) => state.language.current);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    document.body.dir = language === "fa" ? "rtl" : "ltr";
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="app">
      <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AppContent />
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
