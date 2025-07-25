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
import subscribeReducer from "../store/features/subscribeSlice";
import multipleOdersReducer from "../store/features/multipleorderSlice";
import wishListReducer from "../store/features/wishListSlice";


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
    subscribe: subscribeReducer,
    orders: multipleOdersReducer,
    wishlist: wishListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
