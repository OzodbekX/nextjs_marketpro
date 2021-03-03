import * as ActionTypes from "./constants";

import { createAction } from "./utils";

export const initializeApp = createAction(ActionTypes.INITIALIZE_APP.REQUEST);
export const signUp = createAction(ActionTypes.SIGN_UP.REQUEST);
export const logIn = createAction(ActionTypes.LOG_IN.REQUEST);
export const signInEnterPhone = createAction(
  ActionTypes.SIGN_IN_ENTER_PHONE.REQUEST
);
export const signInEnterOtp = createAction(
  ActionTypes.SIGN_IN_ENTER_OTP.REQUEST
);
export const logOut = createAction(ActionTypes.LOG_OUT.REQUEST);

export const userDataChange = (payload, cb = () => {}, errorCb = () => {}) => ({
  type: ActionTypes.USER_DATA_CHANGE.REQUEST,
  payload,
  cb,
  errorCb,
});

export const handleModal = (value) => ({
  type: ActionTypes.MODAL_CHANGE,
  payload: { value },
});

export const languageChange = (value) => ({
  type: ActionTypes.LANGUAGE_CHANGE,
  payload: { value },
});

export const addToWishlist = (userId, productId, token) => ({
  type: ActionTypes.ADD_TO_USER_WISHLIST,
  payload: { userId, productId, token },
});

export const removeFromWishlist = (userId, wishlistId, token) => ({
  type: ActionTypes.REMOVE_FROM_USER_WISHLIST,
  payload: { userId, wishlistId, token },
});

export const getUserWishlistStart = (userId, token) => ({
  type: ActionTypes.GET_USERS_WISHLIST_START,
  payload: { userId, token },
});

export const getUserWishlistSuccess = (wishlist) => ({
  type: ActionTypes.GET_USERS_WISHLIST_SUCCESS,
  payload: wishlist,
});

export const getUserOrdersHistoryAndAddressesAndPickUpPointsStart = (
  userId,
  token
) => ({
  type: ActionTypes.GET_USER_ORDER_HISTORY_AND_ADDRESSES_AND_START,
  payload: { userId, token },
});

export const getUserOrdersHistorySuccess = (orders) => ({
  type: ActionTypes.GET_USER_ORDER_HISTORY_SUCCESS,
  payload: orders,
});

export const getUserAddressesSuccess = (addresses) => ({
  type: ActionTypes.GET_USER_ADDRESSES_SUCCESS,
  payload: addresses,
});

export const getPickUpPointSuccess = (pickUpPoints) => ({
  type: ActionTypes.GET_PICK_UP_POINTS_SUCCESS,
  payload: pickUpPoints,
});

export const getPaymentMethodsSuccess = (paymentMethods) => ({
  type: ActionTypes.GET_PAYMENT_METHODS_SUCCESS,
  payload: paymentMethods,
});

export const setSelectedDeliveryInfo = (data) => ({
  type: ActionTypes.SET_DELIVERY_INFO,
  payload: data,
});

export const checkoutOrdersStart = (data) => ({
  type: ActionTypes.CHECKOUT_ORDER_START,
  payload: data,
});

export const addUserAddressStart = (address, token) => ({
  type: ActionTypes.ADD_USER_ADDRESS_START,
  payload: { address, token },
});

export const removeUserAddressStart = (addressId, token) => ({
  type: ActionTypes.REMOVE_USER_ADDRESS_START,
  payload: { addressId, token },
});

export const getAllLanguagesSuccess = (allLanguages) => ({
  type: ActionTypes.GET_ALL_LANGUAGES_SUCCESS,
  payload: allLanguages,
});
