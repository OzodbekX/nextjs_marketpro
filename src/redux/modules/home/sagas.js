import { call, put, takeEvery } from "redux-saga/effects";
import * as ActionTypes from "./constants";
import { getHomePageSuccess, getPageHTMLSuccess, setLoading } from "./actions";
import { requests } from "../../api/requests";
import { getProductsSuccess } from "../product/actions";
import {
  GET_ALL_CURRENCIES_START,
  GET_ALL_CURRENCIES_SUCCESS,
} from "../app/contants";
import { getAllCurrenciesSuccess, setSelectedCurrency } from "../app/actions";

function* getHomePage({ payload }) {
  try {
    yield put(setLoading(true));
    const response = yield call(requests.home.getBanners);
    yield put(
      getHomePageSuccess({
        banners: {
          sliders: response.data.sliders.data,
          bannerVertical: response.data.bannerVertical.data,
          bannerHorizontal: response.data.bannerHorizontal.data,
          bannerSquare: response.data.bannerSquare.data,
        },
      })
    );
    const bestSellerProducts = yield call(requests.products.getBestSeller);
    const todayDealsProducts = yield call(requests.products.getTodayDeals);
    const freeShippingProducts = yield call(requests.products.getFreeShipping);
    const featuredProducts = yield call(requests.products.getFeatured);
    const superDiscount = yield call(requests.products.getSuperDiscount);

    yield put(
      getProductsSuccess({
        products: {
          bestSellerProducts: bestSellerProducts.data.data,
          todayDealsProducts: todayDealsProducts.data.data,
          freeShippingProducts: freeShippingProducts.data.products,
          featuredProducts: featuredProducts.data.data,
          superDiscountProducts: superDiscount.data.data,
        },
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield call(payload, err.message);
    console.log("Server Error: ", err.message);
  }
}

function* getPage({ payload }) {
  try {
    const response = yield call(requests.home.getPage, payload);
    yield put(getPageHTMLSuccess(response.data.page));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* getAllCurrencies() {
  try {
    const response = yield call(requests.app.getAllCurrencies);
    yield put(getAllCurrenciesSuccess(response.data.data));
    yield put(setSelectedCurrency(response.data.data[0]));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

export default function* homeSaga() {
  yield takeEvery(ActionTypes.GET_HOME_PAGE_START, getHomePage);
  yield takeEvery(ActionTypes.GET_PAGE_HTML_START, getPage);
  yield takeEvery(GET_ALL_CURRENCIES_START, getAllCurrencies);
}
