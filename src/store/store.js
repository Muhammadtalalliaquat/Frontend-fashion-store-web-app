import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import productReducer from "./features/productSlice";
import cartReducer from "./features/productCartSlice";
import accountReducer from "../store/features/productReviewSlice";
import reviewReducer from "../store/features/AccountUpdateSlice";
import orderReducer from "../store/features/orderSlice";
import discountReducer from "../store/features/discountSlice";
import discountOrderReducer from "../store/features/discountSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    product: productReducer,
    cart: cartReducer,
    reviews: reviewReducer,
    orders: orderReducer,
    discount: discountReducer,
    discountOrder: discountOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
