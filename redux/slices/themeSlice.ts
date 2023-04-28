import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface ThemeState {
  mode: string;
  primaryColour: string;
  secondaryColour: string;
}

const initialState: ThemeState = {
  mode: "Light",
  primaryColour: "#d1d1d1",
  secondaryColour: "#161615",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState>) {
      (state.mode = action.payload.mode),
        (state.primaryColour = action.payload.primaryColour),
        (state.secondaryColour = action.payload.secondaryColour);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
