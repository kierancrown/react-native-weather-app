import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import onboardingSlice from './slices/onboardingSlice';
import unitsSlice from './slices/unitsSlice';
import locationsSlice from './slices/locationsSlice';

const persistConfig = {
  key: 'persisted',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'units', 'locations'],
};

const reducers = combineReducers({
  onboarding: onboardingSlice,
  units: unitsSlice,
  locations: locationsSlice,
});

const rootReducer = combineReducers({
  persistent: persistReducer(persistConfig, reducers),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
