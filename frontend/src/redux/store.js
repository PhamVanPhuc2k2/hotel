import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ auth: authReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
});

export const persistor = persistStore(store);
