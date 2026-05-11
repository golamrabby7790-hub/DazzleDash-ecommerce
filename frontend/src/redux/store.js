import { createStore, combineReducers } from "redux";
import { cartReducer, wishlistReducer } from "./reducers";

// সব reducer একসাথে combine করা
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// store create করা
const store = createStore(rootReducer);

export default store;