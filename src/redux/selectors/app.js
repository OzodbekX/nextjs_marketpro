import { createSelector } from "reselect";

const selectApp = (state) => state.app;

export const selectAppMessage = createSelector(
  [selectApp],
  (app) => app && app.message
);
export const selectAppMessageType = createSelector(
  [selectApp],
  (app) => app && app.type
);

export const selectAllCurrencies = createSelector(
  [selectApp],
  (app) => app.allCurrencies
);

export const selectSelectedCurrency = createSelector(
  [selectApp],
  (app) => app.selectedCurrency
);
