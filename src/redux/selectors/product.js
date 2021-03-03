import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

export const selectSellerTopSellingProducts = createSelector(
  [selectProduct],
  ({
    sellerProducts: {
      data: { topSellingProducts },
    },
  }) => topSellingProducts
);

export const selectSellerFeaturedProducts = createSelector(
  [selectProduct],
  ({
    sellerProducts: {
      data: { featuredProducts },
    },
  }) => featuredProducts
);

export const selectSelectedProductDetails = createSelector(
  [selectProduct],
  (product) => product.selectedProduct
);

export const selectProducts = createSelector(
  [selectProduct],
  (product) => product.products
);

export const selectBestSellerProducts = createSelector(
  [selectProducts],
  (products) => products.bestSellerProducts
);

export const selectFreeShippingProducts = createSelector(
  [selectProducts],
  (products) => products.freeShippingProducts
);

export const selectFeaturedProducts = createSelector(
  [selectProducts],
  (products) => products.featuredProducts
);

export const selectSuperDiscountProducts = createSelector(
  [selectProducts],
  (products) => products.superDiscountProducts
);

export const selectTodayDealsProducts = createSelector(
  [selectProducts],
  (products) => products.todayDealsProducts
);

export const selectCategories = createSelector(
  [selectProduct],
  (product) => product.categories
);

export const selectCategorySubCategories = createSelector(
  [selectProduct],
  (product) => product.categorySubCategories
);

export const selectIsFetched = createSelector(
  [selectProduct],
  (product) => product.isFetched
);

export const selectSelectedSubCategoryProducts = createSelector(
  [selectProduct],
  (product) => product.selectedCategoryProducts
);

export const selectSelectedSubCategoryId = createSelector(
  [selectProduct],
  (product) => product.selectedSubCategoryId
);

export const selectSelectedSubCategory = createSelector(
  [selectProduct],
  (product) => product.selectedSubCategory
);

export const selectSelectedSubCategoryInfo = createSelector(
  [selectSelectedSubCategory],
  (category) => category.category
);

export const selectSelectedSubCategoryFilter = createSelector(
  [selectSelectedSubCategory],
  (category) => category.filter
);

export const selectSearchTextResultsCategories = createSelector(
  [selectProduct],
  (product) => product.searchTextResults.categories
);

export const selectSearchTextResultsProducts = createSelector(
  [selectProduct],
  (product) => product.searchTextResults.products
);

export const selectRelatedProductsOfProduct = createSelector(
  [selectProduct],
  (product) => product.relatedProducts
);

export const selectFeaturedCategories = createSelector(
  [selectProduct],
  (product) => product.featuredCategories
);

export const selectSelectedVariant = createSelector(
  [selectProduct],
  (product) => product.selectedProductVariant
);

export const selectSellerDetails = createSelector(
  [selectProduct],
  (product) => product.sellerDetails
);

export const selectSearchTextResultsKeywords = createSelector(
  [selectProduct],
  (product) => product.searchTextResults.keywords
);

export const selectAllMarkets = createSelector(
  [selectProduct],
  (product) => product.allMarkets
);

export const selectProductBrands = createSelector(
  [selectProduct],
  (product) => product.brands
);

export const selectComparingProducts = createSelector(
  [selectProduct],
  (product) => product.selectedForComparing
);
