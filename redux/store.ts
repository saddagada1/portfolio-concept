import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/redux/slices/themeSlice";
import utilsReducer from "@/redux/slices/utilsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    utils: utilsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
