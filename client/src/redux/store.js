import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

import userReducer from './user/userSlice';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
   key: 'root',
   storage,
   version: 1,
};

// ? create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   // ? This is to disable the warning of serializableCheck
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         // ? serializableCheck is disabled because we are using redux-persist
         serializableCheck: false,
      }),
});

export const persistor = persistStore(store);
