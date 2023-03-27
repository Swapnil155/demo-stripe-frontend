import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducres";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import thunk from "redux-thunk";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      // Ignore the actions dispatched by redux-persist
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunk),
];

const rootPersistReducer = persistReducer(rootPersistConfig, rootReducer);

const Store = configureStore({
  reducer: rootPersistReducer,
  middleware,
});

export default Store;
