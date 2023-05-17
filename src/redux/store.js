import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { mylistReducer } from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, mylistReducer);

const store = configureStore({
  reducer: {
    list: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
