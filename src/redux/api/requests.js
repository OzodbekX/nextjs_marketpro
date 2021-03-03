import axios from "axios";
import { base_url } from "../../constants";

// API constants
const APIUrl = `${base_url}api`;

const APIUrlV1 = `${APIUrl}/v1`;
const APIUrlV2 = `${APIUrl}/v2`;

export const requests = {
  app: {
    getAllCurrencies: () => axios.get(`${APIUrlV1}/currencies`),
    getAllLanguages: () => axios.get(`${APIUrlV1}/settings`),
  },
  auth: {
    signUp: ({ name, email, password1, password2 }) =>
      axios.post(`${APIUrlV1}/auth/signup`, {
        name,
        email,
        password: password1,
        passowrd_confirmation: password2,
      }),
    logIn: ({ email, password, remember_me }) =>
      axios.post(`${APIUrlV1}/auth/login`, {
        email,
        password,
        remember_me,
      }),
    signInEnterPhone: ({ phone }) =>
      axios.post(`${APIUrlV1}/auth/registerPhoneNumber`, { phone }),
    signInEnterOtp: ({ phone, otp }) =>
      axios.post(`${APIUrlV1}/auth/signinByPhoneNumber`, {
        phone,
        verification_code: otp,
      }),
    logOut: () => axios.get(`${APIUrlV1}/auth/logout`),
  },
  home: {
    getBanners: () => axios.get(`${APIUrlV2}/banners`),
    getPage: (type) => axios.get(`${APIUrlV1}/get/page?type=${type}`),
  },
  user: {
    getUserData: (token) =>
      axios.get(`${APIUrlV1}/auth/user`, {
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    changeUserAvatar: ({ id, value, token }) =>
      axios.post(`${APIUrlV1}/user/info/update?user_id=${id}`, value, {
        headers: {
          "Content-Type": "multipart/form-data",
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    changeUserCredentials: ({ id, originalKey, value, token }) =>
      axios.post(
        `${APIUrlV1}/user/info/update`,
        {
          user_id: id,
          [originalKey]: value,
        },
        {
          headers: {
            common: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      ),
    getWishlist: ([userId, token]) => {
      return axios.get(`${APIUrlV1}/wishlists/${userId}`, {
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    },
    getOrderHistory: ([userId, token]) =>
      axios.get(
        `https://ashop.helpor.ru/api/v1/user/orders?user_id=${userId}`,
        {
          headers: {
            common: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      ),
    addToWishlist: ([userId, productId, token]) =>
      axios.post(
        `${APIUrlV1}/wishlists`,
        {
          user_id: userId,
          product_id: productId,
        },
        {
          headers: {
            common: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      ),
    removeFromWishlist: ([userId, wishlistId, token]) =>
      axios.delete(`${APIUrlV1}/wishlists/${wishlistId}`, {
        headers: { common: { Authorization: `Bearer ${token}` } },
      }),
    getAddresses: ([userId, token]) =>
      axios.get(`${APIUrlV1}/user/addresses?user_id=${userId}`, {
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    addAddress: ([address, token]) =>
      axios.post(`${APIUrlV1}/store/user/addresses`, address, {
        headers: {
          common: {
            Authorization: `Bearer ${token}`,
          },
        },
      }),
    removeAddress: ([addressId, token]) =>
      axios.post(
        `${APIUrlV1}/delete/user/addresses`,
        { address_id: addressId },
        {
          headers: {
            common: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      ),
    getPickUpPoints: () => axios.get(`${APIUrlV1}/pick-up-points`),
    getPaymentMethods: () => axios.get(`${APIUrlV1}/payment-methods`),
    verifyOrders: ([
      userId,
      addressId,
      paymentType,
      cartProducts,
      shippingType,
    ]) =>
      axios.post(`${APIUrlV1}/make/orders`, {
        user_id: userId,
        address_id: addressId,
        payment_type: paymentType,
        cart_products: cartProducts,
        shipping_type: shippingType,
      }),
  },
  products: {
    getAllMarkets: () => axios.get(`${APIUrlV1}/shops`),
    getSellerDetails: (sellerId) => axios.get(`${APIUrlV1}/shop/${sellerId}`),
    getRelatedProductsOfProduct: (link) => axios.get(`${link}`),
    getSearchResults: ([searchText, categoryId]) =>
      axios.get(
        `${APIUrlV1}/ajax_search?search=${searchText}${
          categoryId ? `&category_id=${categoryId}` : ""
        }`
      ),
    writeComment: ([comment, token]) =>
      axios.post(
        `${APIUrlV1}/store/review`,
        { ...comment },
        {
          headers: {
            common: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      ),
    getBestSeller: () => axios.get(`${APIUrlV1}/products/best-seller`),
    getTodayDeals: () => axios.get(`${APIUrlV1}/products/todays-deal`),
    getFreeShipping: () => axios.get(`${APIUrlV1}/free/shipping/products`),
    getFeatured: () => axios.get(`${APIUrlV1}/free/featured/products`),
    getSuperDiscount: () => axios.get(`${APIUrlV1}/super/discount/products`),
    getDetails: (productId) => axios.get(`${APIUrlV1}/products/${productId}`),
    getBrands: () => axios.get(`${APIUrlV1}/brands`),
    getCategories: () => axios.get(`${APIUrlV1}/categories`),
    getFeaturedCategories: () => axios.get(`${APIUrlV1}/categories/featured`),
    getCategorySubCategories: (categoryId) =>
      axios.get(`${APIUrlV1}/category/sub-categories/${categoryId}`),
    getSubCategory: (subCategoryId) =>
      axios.get(`${APIUrlV1}/sub-categories/${subCategoryId}`),
    getFilteredSubCategoryProducts: (subCategoryId, queries) =>
      axios.get(
        `${APIUrlV1}/sub-categories/${subCategoryId}${
          queries ? `?${queries}` : ""
        } `
      ),
    getSubCategoryProducts: (categoryId) =>
      axios.get(`${APIUrlV1}/products/category/${categoryId}`),
    getSellerTopSellingProducts: (id) =>
      axios.get(`${APIUrlV1}/sellers/${id}/top-selling`),
    getSellerFeaturedProducts: (id) =>
      axios.get(`${APIUrlV1}/sellers/${id}/featured-products`),
  },
};
