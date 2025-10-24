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

// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";


// const persistConfig = {
//   key: "root",
//   storage, // localStorage use karega
// };


// const persistedReducer = persistReducer(persistConfig, userReducer);

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



// export const persistor = persistStore(store);
