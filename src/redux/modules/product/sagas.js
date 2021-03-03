import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "./constants";
import { UPDATE_FILTER_QUERIES_FOR_CATEGORY } from "./constants";
import {
  getAllCategoriesSuccess,
  getAllMarketsSuccess,
  getBrandsSuccess,
  getCategoryProductsSuccess,
  getFeaturedCategories,
  getProductInfoSuccess,
  getRelatedProductsOfProductSuccess,
  getSelectedCategorySubCategoriesSuccess,
  getSellerDetailsSuccess,
  setSearchTextResults,
  setSelectedSubCategorySuccess,
} from "./actions";
import { requests } from "../../api/requests";
import { setLoading } from "../home/actions";

function* getAllMarkets() {
  try {
    const response = yield call(requests.products.getAllMarkets);
    yield put(getAllMarketsSuccess(response.data.data));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* getSellerDetailsStart({ payload }) {
  try {
    const response = yield call(requests.products.getSellerDetails, payload);
    yield put(getSellerDetailsSuccess(response.data.shop));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* getRelatedProducts({
  payload: {
    links: { related },
  },
}) {
  try {
    const relatedProducts = yield call(
      requests.products.getRelatedProductsOfProduct,
      related
    );
    yield put(getRelatedProductsOfProductSuccess(relatedProducts.data.data));
  } catch (err) {
    console.log("server Error: ", err.message);
  }
}

function* getFilteredCategoryProducts({ payload: { categoryId, queries } }) {
  try {
    const filteredCategoryProducts = yield call(
      requests.products.getFilteredSubCategoryProducts,
      categoryId,
      queries
    );
    yield put(
      getCategoryProductsSuccess(
        filteredCategoryProducts.data.filter.original.products.data
      )
    );
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* getSearchResults({ payload: { searchText, categoryId } }) {
  try {
    const response = yield call(requests.products.getSearchResults, [
      searchText,
      categoryId,
    ]);
    yield put(setSearchTextResults(response.data));
  } catch (err) {
    console.log(("Server Error: ", err.message));
  }
}

function* getCategoryProductsAndCategory({ payload: { categoryId, cb } }) {
  try {
    const category = yield call(requests.products.getSubCategory, categoryId);
    yield put(
      setSelectedSubCategorySuccess({
        filter: category.data.filter.original.attributes,
        category: category.data.category,
      })
    );
    const products = yield call(
      requests.products.getSubCategoryProducts,
      categoryId
    );
    yield put(getCategoryProductsSuccess(products.data.data));
  } catch (err) {
    yield call(cb, err.message);
    console.log("Server Error: ", err.message);
  }
}

function* getSubCategories({ payload }) {
  try {
    const subCategories = yield call(
      requests.products.getCategorySubCategories,
      payload
    );
    yield put(getSelectedCategorySubCategoriesSuccess(subCategories.data.data));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* getAllCategories({ payload }) {
  try {
    yield put(setLoading(true));
    const categories = yield call(requests.products.getCategories);
    yield put(getAllCategoriesSuccess(categories.data.data));
    const featuredCategories = yield call(
      requests.products.getFeaturedCategories
    );
    yield put(getFeaturedCategories(featuredCategories.data.data));
    yield put(setLoading(false));
  } catch (err) {
    yield call(payload, err.message);
    console.log("Server Error: ", err.message);
  }
}

function* getProductInfo({ payload: { productId, cb } }) {
  try {
    yield put(setLoading(true));
    const response = yield call(requests.products.getDetails, productId);
    yield put(
      getProductInfoSuccess({
        ...response.data.product.data[0],
        breadcrumbs: response.data.breadcrumbs,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield call(cb, err.message);
    console.log("Server Error: ", err.message);
  }
}

function* getSellerProducts({ payload: { id } }) {
  try {
    let response1 = yield call(
      requests.products.getSellerTopSellingProducts,
      id
    );
    let response2 = yield call(requests.products.getSellerFeaturedProducts, id);
    // console.log("response1: ", response1);
    // console.log("response2: ", response2);
    yield put({
      type: ActionTypes.GET_SELLER_PRODUCTS.SUCCESS,
      payload: {
        topSellingProducts: response1.data.products.data,
        featuredProducts: response2.data.products.data,
      },
    });
  } catch (err) {
    yield call(console.log, "Error: ", err);
    yield put({
      type: ActionTypes.GET_SELLER_PRODUCTS.FAILURE,
      payload: { error: err.message },
    });
  }
}

function* getBrands() {
  try {
    const res = yield call(requests.products.getBrands);
    console.log(res);
    yield put(getBrandsSuccess(res.data.data));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* writeComment({ payload: { token, comment } }) {
  try {
    const response = yield call(requests.products.writeComment, [
      comment,
      token,
    ]);
    console.log(response);
    yield put(getProductInfoSuccess(response.data.product.data[0]));
  } catch (err) {
    console.log("Server Error: ", err.message);
    console.log("Server Error: ", err.response);
  }
}

export default function* productSage() {
  yield takeLatest(ActionTypes.GET_PRODUCT_INFO_START, getProductInfo);
  yield takeEvery(ActionTypes.GET_ALL_CATEGORIES_START, getAllCategories);
  yield takeEvery(
    ActionTypes.GET_SELECTED_CATEGORY_SUB_CATEGORIES_START,
    getSubCategories
  );
  yield takeEvery(
    ActionTypes.SET_SELECTED_SUB_CATEGORY_ID,
    getCategoryProductsAndCategory
  );
  yield takeLatest(ActionTypes.SET_SEARCH_TEXT, getSearchResults);
  yield takeLatest(
    UPDATE_FILTER_QUERIES_FOR_CATEGORY,
    getFilteredCategoryProducts
  );
  yield takeEvery(ActionTypes.GET_PRODUCT_INFO_SUCCESS, getRelatedProducts);
  yield takeEvery(ActionTypes.GET_SELLER_DETAILS_START, getSellerDetailsStart);
  yield takeEvery(ActionTypes.GET_ALL_MARKETS_START, getAllMarkets);

  yield takeEvery(ActionTypes.GET_SELLER_PRODUCTS.REQUEST, getSellerProducts);

  yield takeEvery(ActionTypes.GET_BRANDS_START, getBrands);
  yield takeEvery(ActionTypes.WRITE_COMMENT_TO_PRODUCT_START, writeComment);
}
