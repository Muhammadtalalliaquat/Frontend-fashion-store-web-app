import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import productReducer from "./features/productSlice";
import cartReducer from "./features/productCartSlice";
import accountReducer from "../store/features/productReviewSlice";
import reviewReducer from "../store/features/AccountUpdateSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    product: productReducer,
    cart: cartReducer,
    reviews: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
