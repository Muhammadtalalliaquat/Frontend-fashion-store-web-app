import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import productReducer from "./features/productSlice";
import cartReducer from "./features/productCartSlice";
import accountReducer from "../store/features/productReviewSlice";
import reviewReducer from "../store/features/AccountUpdateSlice";
import orderReducer from "../store/features/orderSlice";
import discountReducer from "../store/features/discountSlice";
import discountOrderReducer from "../store/features/discountSlice";
import contactReducer from "../store/features/contactSlice";
import feedbackReducer from "../store/features/feedbackSlice";


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
    contact: contactReducer,
    feedBack: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
