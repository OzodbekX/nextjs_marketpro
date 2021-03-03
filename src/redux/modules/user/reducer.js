import * as ActionTypes from "./constants";
import { updateProductStatus } from "./utils";

const userReducerDefault = {
  access_token: "",
  openedModal: 0,
  wishlist: [],
  language: {},
  allLanguages: [],
  data: {
    data: null,
    loading: false,
    error: "",
  },
  loggedOut: {
    data: true,
    loading: false,
    error: "",
    auth: {
      loading: false,
      error: "",
    },
  },
  ordersHistory: [],
  pickUpPoints: [],
  paymentMethods: [],
  deliveryInfo: {
    addressId: {},
    paymentType: {},
    shippingType: {},
  },
};

const userReducer = (state = userReducerDefault, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.INITIALIZE_APP.REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          loading: true,
          error: "",
        },
      };
    }

    case ActionTypes.INITIALIZE_APP.SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          loading: false,
          error: "",
        },
      };
    }

    case ActionTypes.INITIALIZE_APP.FAILURE: {
      return {
        ...state,
        data: {
          ...state.data,
          loading: false,
          error: payload.error,
        },
      };
    }

    case ActionTypes.SIGN_UP.REQUEST: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          auth: {
            ...state.loggedOut.auth,
            loading: true,
          },
        },
      };
    }

    case ActionTypes.SIGN_UP.SUCCESS: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          auth: {
            ...state.loggedOut.auth,
            loading: false,
          },
        },
        openedModal: 4,
      };
    }

    case ActionTypes.SIGN_UP.FAILURE: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          auth: {
            ...state.loggedOut.auth,
            loading: false,
          },
        },
      };
    }

    case ActionTypes.SIGN_IN_ENTER_OTP.REQUEST: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          auth: {
            ...state.loggedOut.auth,
            loading: true,
          },
        },
      };
    }

    case ActionTypes.SIGN_IN_ENTER_OTP.SUCCESS: {
      return {
        ...state,
        openedModal: 0,
        access_token: payload.access_token,
        data: {
          ...state.data,
          data: payload.user,
        },
        loggedOut: {
          ...state.loggedOut,
          data: false,
          auth: {
            ...state.loggedOut.auth,
            loading: false,
          },
        },
      };
    }

    case ActionTypes.SIGN_IN_ENTER_OTP.FAILURE: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          data: true,
          auth: {
            ...state.loggedOut.auth,
            loading: false,
            error: payload,
          },
        },
      };
    }

    case ActionTypes.LOG_IN.REQUEST: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          auth: {
            ...state.loggedOut.auth,
            loading: true,
          },
        },
      };
    }

    case ActionTypes.LOG_IN.SUCCESS: {
      return {
        ...state,
        openedModal: 0,
        access_token: payload.access_token,
        data: {
          ...state.data,
          data: payload.user,
        },
        loggedOut: {
          ...state.loggedOut,
          data: false,
          auth: {
            ...state.loggedOut.auth,
            loading: false,
          },
        },
      };
    }

    case ActionTypes.LOG_IN.FAILURE: {
      return {
        ...state,
        loggedOut: {
          ...state.loggedOut,
          auth: {
            ...state.loggedOut.auth,
            loading: false,
          },
        },
      };
    }

    case ActionTypes.USER_DATA_CHANGE.REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          loading: true,
          error: "",
        },
      };
    }

    case ActionTypes.USER_DATA_CHANGE.SUCCESS: {
      return {
        ...state,
        openedModal: 0,
        data: {
          ...state.data,
          loading: false,
          data: payload.data,
        },
      };
    }

    case ActionTypes.USER_DATA_CHANGE.FAILURE: {
      return {
        ...state,
        data: {
          ...state.data,
          loading: false,
          error: payload.error,
        },
      };
    }

    case ActionTypes.LOG_OUT.SUCCESS: {
      return { ...userReducerDefault };
    }

    case ActionTypes.MODAL_CHANGE: {
      return {
        ...state,
        openedModal: payload.value,
      };
    }

    case ActionTypes.LANGUAGE_CHANGE: {
      return {
        ...state,
        language: payload.value,
      };
    }

    case ActionTypes.GET_USERS_WISHLIST_SUCCESS: {
      return {
        ...state,
        wishlist: payload,
      };
    }

    case ActionTypes.GET_USER_ADDRESSES_SUCCESS: {
      return {
        ...state,
        addresses: payload,
      };
    }

    case ActionTypes.GET_USER_ORDER_HISTORY_SUCCESS: {
      return {
        ...state,
        ordersHistory: payload,
      };
    }

    case ActionTypes.GET_PICK_UP_POINTS_SUCCESS: {
      return {
        ...state,
        pickUpPoints: payload,
      };
    }

    case ActionTypes.GET_PAYMENT_METHODS_SUCCESS: {
      return {
        ...state,
        paymentMethods: payload,
      };
    }

    case ActionTypes.UPDATE_PRODUCT_STATUS: {
      return {
        ...state,
        wishlist: updateProductStatus(
          state.wishlist,
          payload.productId,
          payload.boolean
        ),
      };
    }

    case ActionTypes.SET_DELIVERY_INFO: {
      return {
        ...state,
        deliveryInfo: {
          ...state.deliveryInfo,
          ...payload,
        },
      };
    }

    case ActionTypes.GET_ALL_LANGUAGES_SUCCESS: {
      return {
        ...state,
        allLanguages: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
