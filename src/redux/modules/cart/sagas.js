import { put, takeEvery } from "redux-saga/effects";
import { getCartProductsFromLocalStorageSuccess } from "./action";
import { GET_PRODUCTS_SUCCESS } from "../product/constants";
import {
  getProductsForComparingSuccess,
  updateProductStatus,
} from "../product/actions";
import { GET_CART_PRODUCTS_LOCALSTORAGE_START } from "./constants";

function* getDataFromLocalStorage() {
  const products = [];
  const keys = Object.keys(localStorage);

  const newKeys = keys.filter((key) => !isNaN(+key));

  yield newKeys.map((key) => {
    products.push(JSON.parse(localStorage.getItem(`${key}`)));
    put(
      updateProductStatus(
        JSON.parse(localStorage.getItem(`${key}`)).variant.id,
        true
      )
    );
  });

  if (localStorage.getItem("comparingProducts")) {
    yield put(
      getProductsForComparingSuccess(
        JSON.parse(localStorage.getItem("comparingProducts"))
      )
    );
  }

  yield put(getCartProductsFromLocalStorageSuccess(products));
}

export default function* cartSaga() {
  yield takeEvery(GET_PRODUCTS_SUCCESS, getDataFromLocalStorage);
  yield takeEvery(
    GET_CART_PRODUCTS_LOCALSTORAGE_START,
    getDataFromLocalStorage
  );
}
