import { strings } from "../locales/strings";

export const common = {
  companyName: "Citymag",
};


export const productTags = {
  bestseller: "Бестселлер",
  popular: "Популярное",
  super_offer: "Супер предложения!",
  free_delivery: "Беспатная доставка!",
};

export const pageConstants = {
  homePage: "home_page",
  sellerPolicyPage: "seller_policy_page",
  returnPolicyPage: "return_police_page",
  supportPolicyPage: "support_policy_page",
  termsAndConditionsPage: "term_conditions_page",
  privacyPolicyPage: "privacy_policy_page",
};

export const paymentMethodsConstants = {
  cash_on_delivery: strings.cashOnDelivery,
};

export const base_url = "https://ashop.helpor.ru/";

export const userSidebarItems = [
  {
    title: "Личная информация",
    items: [
      {
        title: "Главная",
        href: "/user/main",
      },
    ],
  },
  {
    title: "Заказы",
    items: [
      {
        title: "Мои заказы",
        href: "/user/orders",
      },
    ],
  },
  {
    title: "Доставка",
    items: [
      {
        title: "Мои адреса",
        href: "/user/addresses",
      },
    ],
  },
  {
    title: "Подписки",
    items: [
      {
        title: "Избранное",
        href: "/user/wishlist",
      },
    ],
  },
];
