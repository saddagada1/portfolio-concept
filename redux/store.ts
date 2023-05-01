import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/redux/slices/themeSlice";
import transitionReducer from "@/redux/slices/transitionSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    transition: transitionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
