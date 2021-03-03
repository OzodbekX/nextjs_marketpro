export const updateStatus = (products, productVariantId, boolean) =>
  products.map((product) =>
    product && product.variant.id === productVariantId
      ? {
          ...product,
          inCart: boolean,
        }
      : product
  );

export const updateStatusOfProduct = (
  products,
  categoryProducts,
  productVariantId,
  boolean
) => {
  const newBestSellerProducts = updateStatus(
    products.bestSellerProducts,
    productVariantId,
    boolean
  );

  const newTodayDealsProducts = updateStatus(
    products.todayDealsProducts,
    productVariantId,
    boolean
  );

  const newCategoryProducts = updateStatus(
    categoryProducts,
    productVariantId,
    boolean
  );

  return {
    selectedCategoryProducts: newCategoryProducts,
    products: {
      bestSellerProducts: newBestSellerProducts,
      todayDealsProducts: newTodayDealsProducts,
    },
  };
};
