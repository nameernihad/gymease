import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
  PAUSE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ClientAuth } from "./ClientAuth";
import { AdminAuth } from "./AdminAuth";
import { TrainerAuth } from "./TrainerAuth";

const userpersistConfig = { key: "Client", storage, version: 1 };
const adminPersistConfig = { key: "Admin", storage, version: 1 };
const trainerPersistConfig = { key: "Trainer", storage, version: 1 };

const userPersistReducer = persistReducer(
  userpersistConfig,
  ClientAuth.reducer
);
const adminPersistReducer = persistReducer(
  adminPersistConfig,
  AdminAuth.reducer
);
const trainerPersistReducer = persistReducer(
  trainerPersistConfig,
  TrainerAuth.reducer
);

export const Store = configureStore({
  reducer: {
    Client: userPersistReducer,
    Admin: adminPersistReducer,
    Trainer: trainerPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(Store);
