import * as ActionTypes from "./constants";
import { updateStatusOfProduct } from "./utils";

const productReducerDefault = {
  isFetched: false,
  selectedProduct: {},
  selectedProductVariant: {},
  products: {
    bestSellerProducts: [],
    todayDealsProducts: [],
  },
  selectedCategoryProducts: [],
  selectedSubCategory: {},
  selectedSubCategoryId: undefined,
  categories: [],
  selectedForComparing: [],
  categorySubCategories: [],
  searchTextResults: {},
  relatedProducts: [],
  featuredCategories: [],
  sellerDetails: {},
  sellerProducts: {
    error: "",
    loading: false,
    data: {
      topSellingProducts: [],
      featuredProducts: [],
    },
  },
  allMarkets: [],
  brands: [],
};

const productReducer = (state = productReducerDefault, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_PRODUCTS_FOR_COMPARING_SUCCESS: {
      return {
        ...state,
        selectedForComparing: payload,
      };
    }
    case ActionTypes.ADD_PRODUCT_FOR_COMPARING: {
      let newProductsForComparing = [];
      if (localStorage.getItem("comparingProducts")) {
        const productsForComparing = JSON.parse(
          localStorage.getItem("comparingProducts")
        );
        newProductsForComparing = [...productsForComparing, payload];
        localStorage.removeItem("comparingProducts");
      } else {
        newProductsForComparing.push(payload);
      }
      localStorage.setItem(
        "comparingProducts",
        JSON.stringify(newProductsForComparing)
      );

      return {
        ...state,
        selectedForComparing: newProductsForComparing,
      };
    }
    case ActionTypes.GET_SELLER_PRODUCTS.REQUEST: {
      return {
        ...state,
        sellerProducts: {
          loading: true,
          error: "",
          data: {
            topSellingProducts: [],
            featuredProducts: [],
          },
        },
      };
    }

    case ActionTypes.GET_SELLER_PRODUCTS.SUCCESS: {
      return {
        ...state,
        sellerProducts: {
          loading: false,
          error: "",
          data: {
            topSellingProducts: payload.topSellingProducts,
            featuredProducts: payload.featuredProducts,
          },
        },
      };
    }

    case ActionTypes.GET_SELLER_PRODUCTS.FAILURE: {
      return {
        ...state,
        sellerProducts: {
          loading: false,
          error: payload.error,
          data: {
            topSellingProducts: [],
            featuredProducts: [],
          },
        },
      };
    }

    case ActionTypes.GET_ALL_MARKETS_SUCCESS: {
      return {
        ...state,
        allMarkets: payload,
      };
    }
    case ActionTypes.GET_SELECTED_CATEGORY_SUB_CATEGORIES_START: {
      return {
        ...state,
        categorySubCategories: [],
      };
    }
    case ActionTypes.GET_SELLER_DETAILS_SUCCESS: {
      return {
        ...state,
        sellerDetails: payload,
      };
    }
    case ActionTypes.SET_SELECTED_PRODUCT_VARIANT: {
      return {
        ...state,
        selectedProductVariant: payload,
      };
    }
    case ActionTypes.GET_FEATURED_CATEGORIES_SUCCESS: {
      return {
        ...state,
        featuredCategories: payload,
      };
    }
    case ActionTypes.GET_RELATED_PRODUCTS_OF_PRODUCT_SUCCESS: {
      return {
        ...state,
        relatedProducts: payload,
      };
    }
    case ActionTypes.SET_SEARCH_TEXT_RESULTS: {
      return {
        ...state,
        searchTextResults: payload,
      };
    }
    case ActionTypes.SET_SELECTED_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        selectedSubCategory: payload,
      };
    }
    case ActionTypes.GET_CATEGORY_PRODUCTS_SUCCESS: {
      return {
        ...state,
        selectedCategoryProducts: payload,
      };
    }
    case ActionTypes.SET_SELECTED_SUB_CATEGORY_ID: {
      return {
        ...state,
        selectedSubCategoryId: payload,
      };
    }
    case ActionTypes.GET_SELECTED_CATEGORY_SUB_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categorySubCategories: payload,
      };
    }
    case ActionTypes.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: payload,
      };
    }
    case ActionTypes.UPDATE_PRODUCT_STATUS: {
      return {
        ...state,
        ...updateStatusOfProduct(
          state.products,
          state.selectedCategoryProducts,
          payload.productVariantId,
          payload.boolean
        ),
      };
    }
    case ActionTypes.GET_PRODUCT_INFO_SUCCESS: {
      return {
        ...state,
        selectedProduct: payload,
      };
    }
    case ActionTypes.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        ...payload,
        isFetched: true,
      };
    }
    case ActionTypes.GET_BRANDS_SUCCESS: {
      return {
        ...state,
        brands: payload,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
