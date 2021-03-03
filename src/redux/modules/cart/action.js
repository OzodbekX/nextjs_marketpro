import * as ActionTypes from "./constants";

export const addToCart = (product) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productVariantId) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: productVariantId,
});

export const clearItemFromCart = (id) => ({
  type: ActionTypes.CLEAR_ITEM_FROM_CART,
  payload: id,
});

export const clearCart = () => ({
  type: ActionTypes.CLEAR_CART,
});

export const getCartProductsFromLocalStorageStart = () => ({
  type: ActionTypes.GET_CART_PRODUCTS_LOCALSTORAGE_START,
});

export const getCartProductsFromLocalStorageSuccess = (products) => ({
  type: ActionTypes.GET_CART_PRODUCTS_LOCALSTORAGE_SUCCESS,
  payload: products,
});
