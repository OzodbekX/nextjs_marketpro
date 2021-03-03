import { all, call } from "redux-saga/effects";
import homeSaga from "../modules/home/sagas";
import userSaga from "../modules/user/sagas";
import productSage from "../modules/product/sagas";
import cartSaga from "../modules/cart/sagas";

function* rootSaga() {
  yield all([
    call(homeSaga),
    call(userSaga),
    call(productSage),
    call(cartSaga),
  ]);
}

export default rootSaga;
