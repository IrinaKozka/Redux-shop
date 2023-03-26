import {
  configureStore,
  ThunkAction,
  Action,
  createReducer,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { cartReducer } from "../features/cart/cartSlice";
import { productsReducer } from "../features/Product/productsSlice";
import { notificationsReducer } from "../features/notification/notificationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productsReducer,
    notifications: notificationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
