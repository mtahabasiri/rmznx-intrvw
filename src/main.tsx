import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";

const savedTheme = localStorage.getItem("theme") || "light";
const savedLanguage = localStorage.getItem("language") || "fa";

document.body.className = savedTheme;
document.body.dir = savedLanguage === "fa" ? "rtl" : "ltr";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
