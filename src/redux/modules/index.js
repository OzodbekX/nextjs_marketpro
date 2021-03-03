import cartReducer from "./cart/reducer";
import homeReducer from "./home/reducer";
import userReducer from "./user/reducer";
import productReducer from "./product/reducer";
import appReducer from "./app/reducer";

const allReducers = {
  cart: cartReducer,
  home: homeReducer,
  user: userReducer,
  product: productReducer,
  app: appReducer,
};

export default allReducers;
