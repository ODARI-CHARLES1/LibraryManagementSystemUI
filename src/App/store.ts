import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userApi } from "../Features/Auth/userApi";
import { bookAPI } from "../Features/Books/bookAPI";
import { categoriesApi } from "../Features/Records/CategoriesApi";
import { borrowRecordsAPI } from "../Features/Records/borrowRecordsAPI";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [bookAPI.reducerPath]:bookAPI.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [borrowRecordsAPI.reducerPath]: borrowRecordsAPI.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware).concat(bookAPI.middleware).concat(categoriesApi.middleware).concat(borrowRecordsAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
