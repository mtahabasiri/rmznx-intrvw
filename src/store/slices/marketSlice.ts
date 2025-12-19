import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MarketState {
  sortBy: "name" | "price";
  sortOrder: "asc" | "desc";
  searchQuery: string;
}

const initialState: MarketState = {
  sortBy: "name",
  sortOrder: "asc",
  searchQuery: "",
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<"name" | "price">) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortOrder = "asc";
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSortBy, setSearchQuery } = marketSlice.actions;
export default marketSlice.reducer;
