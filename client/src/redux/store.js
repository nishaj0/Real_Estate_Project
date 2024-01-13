import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
   reducer: { user: userReducer },
   // ? This is to disable the warning of serializableCheck
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         // ? serializableCheck is disabled because we are using redux-persist
         serializableCheck: false,
      }),
});
