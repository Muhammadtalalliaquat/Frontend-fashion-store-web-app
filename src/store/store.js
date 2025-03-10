import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import productReducer from "./features/productSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
