import * as ActionTypes from "./contants";

export const setActionStatus = (message, type) => ({
  type: ActionTypes.SET_ACTION_STATUS,
  payload: { message, type },
});

export const getAllCurrenciesStart = () => ({
  type: ActionTypes.GET_ALL_CURRENCIES_START,
});

export const getAllCurrenciesSuccess = (currencies) => ({
  type: ActionTypes.GET_ALL_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const setSelectedCurrency = (selectedCurrency) => ({
  type: ActionTypes.SET_SELECTED_CURRENCY,
  payload: selectedCurrency,
});
