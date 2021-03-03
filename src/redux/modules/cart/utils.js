export const addProductToCart = (products, productToAdd) => {
  const existingProduct = products.find(
    (product) => product.variant.id === productToAdd.variant.id
  );

  if (existingProduct) {
    return products.map((product) =>
      product.variant.id === productToAdd.variant.id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );
  }

  return [...products, { ...productToAdd, quantity: 1 }];
};

export const removeItem = (products, productVariantIdToRemove) => {
  const existingCartItem = products.find(
    (cartItem) => cartItem.variant.id === productVariantIdToRemove
  );

  if (existingCartItem.quantity === 1)
    return products.filter(
      (cartItem) => cartItem.variant.id !== productVariantIdToRemove
    );

  return products.map((cartItem) =>
    cartItem.variant.id === productVariantIdToRemove
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};
