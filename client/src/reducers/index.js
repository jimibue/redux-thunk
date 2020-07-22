import { combineReducers } from "redux";

import products from "./products.js";

const rootReducer = combineReducers({
  products,
});

export default rootReducer;
