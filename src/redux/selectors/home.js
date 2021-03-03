import { createSelector } from "reselect";

const selectHome = (state) => state.home;

export const selectBanners = createSelector(
  [selectHome],
  (home) => home.banners
);

export const selectCarouselSliders = createSelector(
  [selectBanners],
  (banners) => banners.sliders
);

export const selectHorizontalBanners = createSelector(
  [selectBanners],
  (banners) => banners.bannerHorizontal
);

export const selectVerticalBanners = createSelector(
  [selectBanners],
  (banners) => banners.bannerVertical
);

export const selectSquareBanners = createSelector(
  [selectBanners],
  (banners) => banners.bannerSquare
);

export const selectLoading = createSelector(
  [selectHome],
  (home) => home.loading
);

export const selectPageHTML = createSelector(
  [selectHome],
  (home) => home.pageHTML
);
