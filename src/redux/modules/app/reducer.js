import * as ActionTypes from "./contants";

const appReducerDefault = {
  message: "",
  type: "",
  allCurrencies: [],
  selectedCurrency: {},
};

const appReducer = (state = appReducerDefault, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_SELECTED_CURRENCY: {
      return {
        ...state,
        selectedCurrency: payload,
      };
    }
    case ActionTypes.SET_ACTION_STATUS: {
      return {
        ...state,
        message: payload.message,
        type: payload.type,
      };
    }
    case ActionTypes.GET_ALL_CURRENCIES_SUCCESS: {
      return {
        ...state,
        allCurrencies: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
