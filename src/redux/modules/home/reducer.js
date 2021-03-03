import * as ActionTypes from "./constants";

const homeReducerDefault = {
  banners: {
    sliders: [],
    bannerSquare: [],
    bannerHorizontal: [],
    bannerVertical: [],
  },
  loading: true,
  pageHTML: {},
};

const homeReducer = (state = homeReducerDefault, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_PAGE_HTML_SUCCESS: {
      return {
        ...state,
        pageHTML: payload,
      };
    }
    case ActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: payload,
      };
    }
    case ActionTypes.GET_HOME_PAGE_START: {
      return {
        ...state,
      };
    }
    case ActionTypes.GET_HOME_PAGE_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
