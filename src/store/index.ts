import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleWare from "redux-saga";
import { rootReducer } from "./root-reducer";
import { createLogger } from "redux-logger";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage: localforage,
  whitelist: ["auth"],
};

const sagaMiddleWare = createSagaMiddleWare();
const logger = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ thunk: false, serializableCheck: false })
      .concat(
        sagaMiddleWare,
        logger
      )
}
);

const persistor = persistStore(store);
export { persistor, store };

sagaMiddleWare.run(rootSaga);

