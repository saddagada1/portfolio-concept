import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TransitionState {
  shouldTransition: boolean;
  transitionURL: string;
}

const initialState: TransitionState = {
  shouldTransition: false,
  transitionURL: "/",
};

const transitionSlice = createSlice({
  name: "transition",
  initialState,
  reducers: {
    setTransition(state, action: PayloadAction<TransitionState>) {
      state.shouldTransition = action.payload.shouldTransition;
      state.transitionURL = action.payload.transitionURL;
    },
    setShouldTransition(state, action: PayloadAction<{ shouldTransition: boolean }>) {
      state.shouldTransition = action.payload.shouldTransition;
    },
  },
});

export const { setTransition } = transitionSlice.actions;
export const { setShouldTransition } = transitionSlice.actions;

export const selectUtils = (state: RootState) => state.transition;

export default transitionSlice.reducer;
