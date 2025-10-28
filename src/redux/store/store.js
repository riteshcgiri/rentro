import  {configureStore} from '@reduxjs/toolkit';
import rentroReducer from '../slices/rentroSlice';
import rentFormReducer from '../slices/rentFormSlice';
import searchFilterSlice from '../slices/searchFilterSlice';
import loaderSlice from '../slices/loaderSlice';   
import notificationSlice from '../slices/notificationSlice';  
import authSlice from '../slices/authSlice'
import carsSlice from '../slices/carsSlice'
export const store = configureStore({
    reducer: {
        // Add your reducers here
        rentroReducer,
        rentFormReducer,
        searchFilterSlice,
        loaderSlice,
        notificationSlice,
        authSlice,
        carsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
});