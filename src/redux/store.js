import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { api } from "./querySlice";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, app: appReducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
