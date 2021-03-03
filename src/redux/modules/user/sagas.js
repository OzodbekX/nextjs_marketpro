import { call, put, takeEvery } from "redux-saga/effects";
import * as ActionTypes from "./constants";
import { requests } from "../../api/requests";
import { strings } from "../../../locales/strings";
import {
  getAllLanguagesSuccess,
  getPaymentMethodsSuccess,
  getPickUpPointSuccess,
  getUserAddressesSuccess,
  getUserOrdersHistorySuccess,
  getUserWishlistSuccess,
  languageChange,
} from "./action";
import { setActionStatus } from "../app/actions";
import { GET_ALL_CURRENCIES_START } from "../app/contants";

function* initializeAppFunc() {
  try {
    // let state = yield select();

    // // yield call(strings.setLanguage, state.user.language);

    let userState = yield call(
      [localStorage, localStorage.getItem],
      "userState"
    );
    userState = yield call(JSON.parse, userState);

    if (!userState) {
      yield put({
        type: ActionTypes.LOG_OUT.SUCCESS,
      });
    } else {
      let dateNow = new Date(Date.now());
      let dateToken = new Date(userState.expires_at);
      if (dateNow < dateToken) {
        let response = yield call(
          requests.user.getUserData,
          userState.access_token
        );
        yield call(console.log, "response (initialize) ", response);
        yield put({
          type: ActionTypes.LOG_IN.SUCCESS,
          payload: {
            access_token: userState.access_token,
            user: response.data,
          },
        });
      } else {
        yield put({
          type: ActionTypes.LOG_OUT.SUCCESS,
        });
      }
    }

    yield put({
      type: ActionTypes.INITIALIZE_APP.SUCCESS,
    });
  } catch (err) {
    yield call(console.log, err);
    yield put({
      type: ActionTypes.INITIALIZE_APP.FAILURE,
      payload: { error: "Error!" },
    });
  }
}

function* signUpFunc({ payload, cb, errorCb }) {
  try {
    yield call(requests.auth.signUp, payload);
    yield call(cb);
    yield put({
      type: ActionTypes.SIGN_UP.SUCCESS,
      payload,
    });
  } catch (err) {
    yield call(errorCb, err.response.status, err.response.data);
    yield put({
      type: ActionTypes.SIGN_UP.FAILURE,
      payload,
    });
  }
}

function* logInFunc({ payload, cb, errorCb }) {
  try {
    let response = yield call(requests.auth.logIn, payload);
    yield call(console.log, "response (login) : ", response);
    let { access_token, expires_at } = response.data;
    yield call(
      [localStorage, localStorage.setItem],
      "userState",
      JSON.stringify({
        access_token,
        expires_at,
      })
    );
    yield call(cb);
    yield put({
      type: ActionTypes.LOG_IN.SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield call(errorCb, err.response.status, err.response.data);
    yield put({
      type: ActionTypes.LOG_IN.FAILURE,
      payload,
    });
  }
}

function* signInEnterPhoneFunc({ payload }) {
  try {
    yield call(requests.auth.signInEnterPhone, payload);
    yield put({
      type: ActionTypes.SIGN_IN_ENTER_PHONE.SUCCESS,
      payload,
    });
  } catch (err) {
    yield call(console.log, "err: ", err);
    yield put({
      type: ActionTypes.SIGN_IN_ENTER_PHONE.FAILURE,
      payload,
    });
  }
}

function* signInEnterOtpFunc({ payload, cb }) {
  try {
    let response = yield call(requests.auth.signInEnterOtp, payload);
    yield call(console.log, "response (otp) : ", response);
    let { access_token, expires_at } = response.data;
    yield call(
      [localStorage, localStorage.setItem],
      "userState",
      JSON.stringify({
        access_token,
        expires_at,
      })
    );
    yield call(cb);
    yield put({
      type: ActionTypes.SIGN_IN_ENTER_OTP.SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield call(console.log, "err.response: ", err.response);
    let errMsg = strings.unknownError;
    if (err.response.status === 401) {
      errMsg = strings.wrongCode;
    }
    yield put({
      type: ActionTypes.SIGN_IN_ENTER_OTP.FAILURE,
      payload: errMsg,
    });
  }
}

function* userDataChangeFunc({ payload, cb }) {
  try {
    let response;
    if (payload.originalKey === "avatar") {
      let { id, value, token } = payload;
      response = yield call(requests.user.changeUserAvatar, {
        id,
        value,
        token,
      });
    } else {
      let { id, value, token, originalKey } = payload;
      response = yield call(requests.user.changeUserCredentials, {
        id,
        value,
        token,
        originalKey,
      });
    }
    yield call(console.log, "response (edit profile): ", response);
    let { user } = response.data.changed_fields;
    // yield delay(5000);
    yield put({
      type: ActionTypes.USER_DATA_CHANGE.SUCCESS,
      payload: { data: user },
    });
    yield call(cb);
  } catch (err) {
    yield call(console.log, "err: ", err);
  }
}

function* logOutFunc({ cb, errorCb }) {
  try {
    yield call([localStorage, localStorage.removeItem], "userState");
    yield call(cb);
    yield put({
      type: ActionTypes.LOG_OUT.SUCCESS,
    });
  } catch (err) {
    yield call(errorCb);
    yield put({
      type: ActionTypes.LOG_OUT.FAILURE,
    });
  }
}

function* removeFromUserWishlist({ payload }) {
  try {
    const { userId, wishlistId, token } = payload;
    const response = yield call(requests.user.removeFromWishlist, [
      userId,
      wishlistId,
      token,
    ]);
    yield put(getUserWishlistSuccess(response.data.wishlists.data));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* addToUserWishlist({ payload }) {
  try {
    const { userId, productId, token } = payload;
    const response = yield call(requests.user.addToWishlist, [
      userId,
      productId,
      token,
    ]);
    yield put(getUserWishlistSuccess(response.data.wishlists.data));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

function* getUserWishlist({ payload: { userId, token } }) {
  try {
    const wishlist = yield call(requests.user.getWishlist, [userId, token]);
    yield put(getUserWishlistSuccess(wishlist.data.data));
  } catch (err) {
    yield put(setActionStatus(err.message, "fail"));
    console.log("Server Error: ", err.message);
  }
}

function* getUserOrdersHistoryAndAddressesAndPickUpPointsStart({
  payload: { userId, token },
}) {
  try {
    const orders = yield call(requests.user.getOrderHistory, [userId, token]);
    const addresses = yield call(requests.user.getAddresses, [userId, token]);
    const pickUpPoints = yield call(requests.user.getPickUpPoints);
    const paymentMethods = yield call(requests.user.getPaymentMethods);

    yield put(getUserOrdersHistorySuccess(orders.data.orders.data));
    yield put(getUserAddressesSuccess(addresses.data.addresses));
    yield put(getPickUpPointSuccess(pickUpPoints.data.pick_up_points));
    yield put(getPaymentMethodsSuccess(paymentMethods.data.methods));
  } catch (err) {
    yield put(setActionStatus(err.message, "fail"));
    console.log("Server Error: ", err.message);
  }
}

function* checkoutOrders({ payload }) {
  try {
    const {
      userId,
      addressId,
      paymentType,
      cartProducts,
      shippingType,
    } = payload;
    const response = yield call(requests.user.verifyOrders, [
      userId,
      addressId,
      paymentType,
      cartProducts,
      shippingType,
    ]);
    yield put(setActionStatus(response.data.message, "success"));
  } catch (err) {
    yield put(setActionStatus(err.message, "fail"));
    console.log("Server Error: ", err.response);
  }
}

function* addUserAddress({ payload: { address, token } }) {
  try {
    const response = yield call(requests.user.addAddress, [address, token]);
    yield put(getUserAddressesSuccess(response.data.addresses));
  } catch (err) {
    console.log(err.message);
  }
}

function* removeUserAddress({ payload: { addressId, token } }) {
  try {
    const response = yield call(requests.user.removeAddress, [
      addressId,
      token,
    ]);
    console.log(response);
    yield put(getUserAddressesSuccess(response.data.addresses));
  } catch (err) {
    console.log(err.message);
  }
}

function* getAllLanguages() {
  try {
    const response = yield call(requests.app.getAllLanguages);
    yield put(getAllLanguagesSuccess(response.data.data[0].languages));
    yield put(languageChange(response.data.data[0].languages[0]));
  } catch (err) {
    console.log("Server Error: ", err.message);
  }
}

export default function* userSaga() {
  yield takeEvery(ActionTypes.INITIALIZE_APP.REQUEST, initializeAppFunc);
  yield takeEvery(ActionTypes.SIGN_UP.REQUEST, signUpFunc);
  yield takeEvery(ActionTypes.LOG_IN.REQUEST, logInFunc);
  yield takeEvery(
    ActionTypes.SIGN_IN_ENTER_PHONE.REQUEST,
    signInEnterPhoneFunc
  );
  yield takeEvery(ActionTypes.SIGN_IN_ENTER_OTP.REQUEST, signInEnterOtpFunc);
  yield takeEvery(ActionTypes.USER_DATA_CHANGE.REQUEST, userDataChangeFunc);
  yield takeEvery(ActionTypes.LOG_OUT.REQUEST, logOutFunc);
  yield takeEvery(ActionTypes.ADD_TO_USER_WISHLIST, addToUserWishlist);
  yield takeEvery(
    ActionTypes.REMOVE_FROM_USER_WISHLIST,
    removeFromUserWishlist
  );
  yield takeEvery(ActionTypes.GET_USERS_WISHLIST_START, getUserWishlist);
  yield takeEvery(
    ActionTypes.GET_USER_ORDER_HISTORY_AND_ADDRESSES_AND_START,
    getUserOrdersHistoryAndAddressesAndPickUpPointsStart
  );
  yield takeEvery(ActionTypes.CHECKOUT_ORDER_START, checkoutOrders);
  yield takeEvery(ActionTypes.ADD_USER_ADDRESS_START, addUserAddress);
  yield takeEvery(ActionTypes.REMOVE_USER_ADDRESS_START, removeUserAddress);
  yield takeEvery(GET_ALL_CURRENCIES_START, getAllLanguages);
}
