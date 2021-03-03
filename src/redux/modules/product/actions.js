import * as ActionTypes from "./constants";
import { createAction } from "../user/utils";

export const getSellerProducts = createAction(
  ActionTypes.GET_SELLER_PRODUCTS.REQUEST
);

export const updateQueries = (categoryId, queries) => ({
  type: ActionTypes.UPDATE_FILTER_QUERIES_FOR_CATEGORY,
  payload: { categoryId, queries },
});

export const setSearchTextResults = (searchResults) => ({
  type: ActionTypes.SET_SEARCH_TEXT_RESULTS,
  payload: searchResults,
});

export const setSearchText = (searchText, categoryId) => ({
  type: ActionTypes.SET_SEARCH_TEXT,
  payload: { searchText, categoryId },
});

export const getCategoryProductsStart = (categoryId) => ({
  type: ActionTypes.GET_CATEGORY_PRODUCTS_START,
  payload: categoryId,
});

export const getCategoryProductsSuccess = (products) => ({
  type: ActionTypes.GET_CATEGORY_PRODUCTS_SUCCESS,
  payload: products,
});

export const setSelectedSubCategoryId = (categoryId, cb) => ({
  type: ActionTypes.SET_SELECTED_SUB_CATEGORY_ID,
  payload: { categoryId, cb },
});

export const setSelectedSubCategorySuccess = (category) => ({
  type: ActionTypes.SET_SELECTED_SUB_CATEGORY_SUCCESS,
  payload: category,
});

export const getSelectedCategorySubCategoriesStart = (categoryId) => ({
  type: ActionTypes.GET_SELECTED_CATEGORY_SUB_CATEGORIES_START,
  payload: categoryId,
});

export const getSelectedCategorySubCategoriesSuccess = (subCategories) => ({
  type: ActionTypes.GET_SELECTED_CATEGORY_SUB_CATEGORIES_SUCCESS,
  payload: subCategories,
});

export const getAllCategoriesStart = (cb) => ({
  type: ActionTypes.GET_ALL_CATEGORIES_START,
  payload: cb,
});

export const getAllCategoriesSuccess = (categories) => ({
  type: ActionTypes.GET_ALL_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getProductInfoStart = (productId, cb) => ({
  type: ActionTypes.GET_PRODUCT_INFO_START,
  payload: { productId, cb },
});

export const getProductInfoSuccess = (product) => ({
  type: ActionTypes.GET_PRODUCT_INFO_SUCCESS,
  payload: product,
});

export const getProductsSuccess = (products) => ({
  type: ActionTypes.GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const updateProductStatus = (productVariantId, boolean) => ({
  type: ActionTypes.UPDATE_PRODUCT_STATUS,
  payload: { productVariantId, boolean },
});

export const getRelatedProductsOfProductSuccess = (relatedProducts) => ({
  type: ActionTypes.GET_RELATED_PRODUCTS_OF_PRODUCT_SUCCESS,
  payload: relatedProducts,
});

export const getFeaturedCategories = (featuredCategories) => ({
  type: ActionTypes.GET_FEATURED_CATEGORIES_SUCCESS,
  payload: featuredCategories,
});

export const setSelectedProductVariant = (variant) => ({
  type: ActionTypes.SET_SELECTED_PRODUCT_VARIANT,
  payload: variant,
});

export const getSellerDetailsStart = (sellerId) => ({
  type: ActionTypes.GET_SELLER_DETAILS_START,
  payload: sellerId,
});

export const getSellerDetailsSuccess = (seller) => ({
  type: ActionTypes.GET_SELLER_DETAILS_SUCCESS,
  payload: seller,
});

export const getAllMarketsStart = () => ({
  type: ActionTypes.GET_ALL_MARKETS_START,
});

export const getAllMarketsSuccess = (allMarkets) => ({
  type: ActionTypes.GET_ALL_MARKETS_SUCCESS,
  payload: allMarkets,
});

export const getBrandsStart = () => ({
  type: ActionTypes.GET_BRANDS_START,
});

export const getBrandsSuccess = (brands) => ({
  type: ActionTypes.GET_BRANDS_SUCCESS,
  payload: brands,
});

export const writeCommentToProductStart = (comment, token) => ({
  type: ActionTypes.WRITE_COMMENT_TO_PRODUCT_START,
  payload: { comment, token },
});

export const addProductForComparing = (product) => ({
  type: ActionTypes.ADD_PRODUCT_FOR_COMPARING,
  payload: product,
});

export const getProductsForComparingSuccess = (products) => ({
  type: ActionTypes.GET_PRODUCTS_FOR_COMPARING_SUCCESS,
  payload: products,
});
