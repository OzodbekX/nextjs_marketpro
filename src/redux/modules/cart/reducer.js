import * as ActionTypes from "./constants";
import { addProductToCart, removeItem } from "./utils";

const cartReducerDefault = {
  products: [],
};

const cartReducer = (state = cartReducerDefault, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_CART_PRODUCTS_LOCALSTORAGE_SUCCESS: {
      return {
        ...state,
        products: payload,
      };
    }
    case ActionTypes.ADD_TO_CART: {
      const newProducts = addProductToCart(state.products, payload);

      const productToAdd = newProducts.find(
        (product) => product.variant.id === payload.variant.id
      );

      localStorage.setItem(
        `${payload.variant.id}`,
        JSON.stringify(productToAdd)
      );

      return {
        ...state,
        products: newProducts,
      };
    }
    case ActionTypes.REMOVE_FROM_CART: {
      const newProducts = removeItem(state.products, payload);

      const productToRemove = newProducts.find(
        (product) => product.variant.id === payload
      );

      localStorage.removeItem(`${payload}`);

      if (productToRemove) {
        localStorage.setItem(
          `${productToRemove.variant.id}`,
          JSON.stringify(productToRemove)
        );
      }

      return {
        ...state,
        products: newProducts,
      };
    }
    case ActionTypes.CLEAR_ITEM_FROM_CART: {
      localStorage.removeItem(`${payload}`);

      return {
        ...state,
        products: state.products.filter(
          (product) => product.variant.id !== payload
        ),
      };
    }
    case ActionTypes.CLEAR_CART: {
      const userState = localStorage.getItem("userState");
      let productsForComparing = "";
      if (localStorage.getItem("comparingProducts")) {
        productsForComparing = localStorage.getItem("comparingProducts");
      }
      localStorage.clear();
      localStorage.setItem("userState", userState);
      localStorage.setItem("comparingProducts", productsForComparing);

      return {
        ...state,
        products: [],
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
