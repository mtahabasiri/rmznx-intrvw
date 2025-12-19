import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  current: "en" | "fa";
}

const initialState: LanguageState = {
  current: (localStorage.getItem("language") as "en" | "fa") || "fa",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      localStorage.setItem("language", state.current);
      document.body.dir = action.payload === "fa" ? "rtl" : "ltr";
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
