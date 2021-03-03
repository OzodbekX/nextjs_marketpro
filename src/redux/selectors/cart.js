import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartProducts = createSelector(
  [selectCart],
  (cart) => cart.products
);

export const selectCartProductsCount = createSelector(
  [selectCartProducts],
  (products) =>
    products.reduce(
      (accumulatedQuantity, product) => accumulatedQuantity + product.quantity,
      0
    )
);

export const selectCartProductsOldTotal = createSelector(
  [selectCartProducts],
  (products) =>
    products.reduce(
      (accumulatedQuantity, product) =>
        accumulatedQuantity + product.quantity * product.basePrice,
      0
    )
);

export const selectCartProductsNewTotal = createSelector(
  [selectCartProducts],
  (products) =>
    products.reduce(
      (accumulatedQuantity, product) =>
        accumulatedQuantity + product.quantity * product.variant.price,
      0
    )
);
