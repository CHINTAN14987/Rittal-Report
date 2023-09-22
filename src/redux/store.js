import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { api } from "./querySlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// Create a rootReducer by combining your reducers
const rootReducer = combineReducers({
  app: appReducer,
 
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, rootReducer: persistedReducer }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export const persistor = persistStore(store);
