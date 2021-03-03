import * as ActionTypes from "./constants";

export const getHomePageStart = (cb) => ({
  type: ActionTypes.GET_HOME_PAGE_START,
  payload: cb,
});

export const getHomePageSuccess = (homeData) => ({
  type: ActionTypes.GET_HOME_PAGE_SUCCESS,
  payload: homeData,
});

export const setLoading = (boolean) => ({
  type: ActionTypes.SET_LOADING,
  payload: boolean,
});

export const getPageHTMLStart = (type) => ({
  type: ActionTypes.GET_PAGE_HTML_START,
  payload: type,
});

export const getPageHTMLSuccess = (pageHTML) => ({
  type: ActionTypes.GET_PAGE_HTML_SUCCESS,
  payload: pageHTML,
});
