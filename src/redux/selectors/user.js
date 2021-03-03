import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserAccessToken = createSelector(
  [selectUser],
  ({ access_token }) => access_token
);

export const selectUserData = createSelector(
  [selectUser],
  ({ data }) => data.data
);

export const selectUserDataLoading = createSelector(
  [selectUser],
  ({ data: { loading } }) => loading
);

export const selectUserDataError = createSelector(
  [selectUser],
  ({ data: { error } }) => error
);

export const selectUserLanguage = createSelector(
  [selectUser],
  ({ language }) => language
);

export const selectUserOpenedModal = createSelector(
  [selectUser],
  ({ openedModal }) => openedModal
);

export const selectUserLoggedOut = createSelector(
  [selectUser],
  ({ loggedOut }) => loggedOut.data
);

export const selectUserAuthLoading = createSelector(
  [selectUser],
  ({
    loggedOut: {
      auth: { loading: authLoading },
    },
  }) => authLoading
);

export const selectUserAuthError = createSelector(
  [selectUser],
  ({
    loggedOut: {
      auth: { error: authError },
    },
  }) => authError
);

export const selectUserWishlist = createSelector(
  [selectUser],
  (user) => user.wishlist
);

export const selectUserWishlistCount = createSelector(
  [selectUserWishlist],
  (wishlist) => wishlist && wishlist.length
);

export const selectUserOrdersHistory = createSelector(
  [selectUser],
  (user) => user.ordersHistory
);

export const selectUserAddresses = createSelector(
  [selectUser],
  (user) => user.addresses
);

export const selectUserPickUpPoints = createSelector(
  [selectUser],
  (user) => user.pickUpPoints
);

export const selectUserPaymentMethods = createSelector(
  [selectUser],
  (user) => user.paymentMethods
);

export const selectDeliveryInfo = createSelector(
  [selectUser],
  (user) => user.deliveryInfo
);

export const selectAllLanguages = createSelector(
  [selectUser],
  (user) => user.allLanguages
);
