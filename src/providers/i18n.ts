import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      markets: "Markets",
      search: "Search",
      name: "Name",
      price: "Price",
      change: "24h Change",
      volume: "Volume",
      high: "24h High",
      low: "24h Low",
      marketDetails: "Market Details",
      loading: "Loading...",
      error: "Error loading data",
      noResults: "No results found",
      buy: "Buy",
      sell: "Sell",
      financial: "Financial",
      chart: "Chart",
      orderBook: "Order Book",
      weeklyHigh: "Weekly High",
      weeklyLow: "Weekly Low",
      weeklyChange: "Weekly Change",
      amount: "Amount",
      total: "Total",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
    },
  },
  fa: {
    translation: {
      markets: "بازارها",
      search: "جستجو",
      name: "نام",
      price: "قیمت",
      change: "تغییر ۲۴ ساعت",
      volume: "حجم معاملات",
      high: "بالاترین قیمت",
      low: "پایین‌ترین قیمت",
      marketDetails: "جزئیات بازار",
      loading: "در حال بارگذاری...",
      error: "خطا در بارگذاری اطلاعات",
      noResults: "نتیجه‌ای یافت نشد",
      buy: "خرید",
      sell: "فروش",
      financial: "مالی",
      chart: "نمودار",
      orderBook: "دفتر سفارشات",
      weeklyHigh: "بالاترین هفتگی",
      weeklyLow: "پایین‌ترین هفتگی",
      weeklyChange: "تغییر هفتگی",
      amount: "مقدار",
      total: "کل",
      language: "زبان",
      theme: "تم",
      light: "روشن",
      dark: "تاریک",
    },
  },
};

const savedLanguage = (localStorage.getItem("language") as "en" | "fa") || "fa";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
