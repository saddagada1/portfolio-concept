import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface UtilsState {
  shouldGlitch: boolean;
}

const initialState: UtilsState = {
  shouldGlitch: false,
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setUtils(state, action: PayloadAction<UtilsState>) {
      state.shouldGlitch = action.payload.shouldGlitch;
    },
    setShouldGlitch(state, action: PayloadAction<{ shouldGlitch: boolean }>) {
      state.shouldGlitch = action.payload.shouldGlitch;
    },
  },
});

export const { setUtils } = utilsSlice.actions;
export const { setShouldGlitch } = utilsSlice.actions;

export const selectUtils = (state: RootState) => state.utils;

export default utilsSlice.reducer;
