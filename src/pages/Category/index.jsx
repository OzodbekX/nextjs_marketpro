import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";
import {
  selectCategorySubCategories,
  selectSelectedSubCategoryFilter,
  selectSelectedSubCategoryId,
  selectSelectedSubCategoryInfo,
  selectSelectedSubCategoryProducts,
} from "../../redux/selectors/product";
import { selectUserLanguage } from "../../redux/selectors/user";
import {
  getCategoryProductsStart,
  getSelectedCategorySubCategoriesStart,
  setSelectedSubCategoryId,
  updateQueries,
} from "../../redux/modules/product/actions";
import { base_url } from "../../constants";
import { useAlert } from "react-alert";
import CheckboxContainer from "../../containers/CheckboxContainer";
import CardsContainer from "../../containers/CardsContainer";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { strings } from "../../locales/strings";
import Slider from "../../components/Slider";
import { makeFirstCapital } from "../../utils";

const CategoryPage = ({
  categoryProducts,
  selectedSubCategoryInfo,
  selectedSubCategoryFilter,
  getCategoryProductsStart,
  setSelectedSubCategoryId,
  selectedSubCategoryId,
  updateQueries,
  selectedSubCategories,
  language,
  getSelectedCategorySubCategoriesStart,
}) => {
  const alert = useAlert();
  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    if (router.query.id) {
      setSelectedSubCategoryId(router.query.id, (err) => {
        alert.error(err);
      });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (selectedSubCategoryId) {
      getCategoryProductsStart(selectedSubCategoryId);
    }
  }, []);

  useEffect(() => {
    if (selectedSubCategoryId) {
      getSelectedCategorySubCategoriesStart(selectedSubCategoryId.categoryId);
    }
  }, [selectedSubCategoryInfo]);

  useEffect(() => {
    if (router && selectedSubCategoryInfo) {
      const pathname = router.asPath.split("?")[0];
      const queries = router.asPath.split("?")[1];

      let arrayQueries = [];
      if (queries) {
        if (queries.includes("&")) {
          arrayQueries = queries.split("&");
        } else {
          arrayQueries[0] = queries;
        }
      }

      const newArrayQueries = arrayQueries.filter(
        (qry) => !qry.includes("brand")
      );

      if (selectedBrand.length) {
        newArrayQueries.push(`brand=${selectedBrand}`);
      }

      let newCurrentQueries = "";
      if (newArrayQueries.length) {
        newCurrentQueries = newArrayQueries.join("&");
      } else {
        newCurrentQueries = newArrayQueries.join("");
      }

      router.push(`${pathname}?${newCurrentQueries}`);
      updateQueries(selectedSubCategoryInfo.slug, newCurrentQueries);
    }
  }, [selectedBrand]);

  const md = useMediaQuery(768);
  const xsm = useMediaQuery(420);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return selectedSubCategoryInfo ? (
    selectedSubCategoryInfo.parent ? (
      <div>
        <div
          className={
            "flex flex-row flex-wrap flex-wrap justify-start items-center mt-8"
          }
        >
          {selectedSubCategoryInfo.parent_id !== 0 &&
            selectedSubCategoryInfo.breadcrumbs.map((nav) => (
              <div className={"flex flex-row items-center"}>
                <p
                  className={
                    "text-customBlue1 text-xs md:text-base mr-1 md:mr-4 text-customBlue2-hover cursor-pointer"
                  }
                  onClick={() => router.push(`/category/${nav.slug}`)}
                >
                  {nav.name}{" "}
                </p>
                <span className={"text-gray-400 mr-1 md:mr-2 text-xs"}>
                  &#10095;
                </span>
              </div>
            ))}
          <p
            className={
              "text-customBlue1 text-xs md:text-base mr-1 md:mr-4 text-customBlue2-hover cursor-pointer"
            }
          >
            {selectedSubCategoryInfo.name}
          </p>
        </div>
        <div className="mb-8 mt-4 flex flex-row justify-start">
          <h1 className="relative font-extrabold text-2xl">
            {selectedSubCategoryInfo.name}
            <span className="flex flex-row absolute -top-2 font-bold -right-16 text-sm text-gray-400">
              {`${categoryProducts.length} ${strings.product2}`}
            </span>
          </h1>
        </div>
        <div className="mb-2 flex flex-wrap gap-1">
          {selectedSubCategoryInfo.tag.map((tag) => (
            <span className="mr-2 text-sm bg-gray-200 text-gray-700 hover:text-blue-500 cursor-pointer rounded-xl px-4 p-2">
              {tag}
            </span>
          ))}
        </div>
        {/*<div className="mb-4">*/}
        {/*  <img*/}
        {/*    src={`${base_url}${selectedSubCategoryInfo.banner}`}*/}
        {/*    alt={"Category Banner"}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className={`flex ${!md ? "flex-row" : "flex-col"} w-full`}>
          <div
            className={`w-1/5 flex justify-around ${
              md ? "flex-row" : "flex-col"
            }`}
          >
            <div>
              <div className={"font-bold"}>
                {makeFirstCapital(strings.category)}
              </div>
              <div className={"mt-2 font-medium"}>
                <div className={"ml-1"}>
                  <span className={"text-gray-400 mr-1"}> &#10094;</span>
                  <span className={"bg-customGrey py-1 px-2 rounded"}>
                    {selectedSubCategoryInfo.name}
                  </span>
                </div>
                <div className={"ml-8"}>
                  {selectedSubCategories.map((subCategory) => (
                    <div
                      className={`pt-1 cursor-pointer`}
                      onClick={() =>
                        router.push(`/category/${subCategory.slug}`)
                      }
                    >
                      {subCategory.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={"mb-4 mt-2 text-allbestcardBalck font-bold"}>
              <Slider category={selectedSubCategoryInfo} />
            </div>
            {selectedSubCategoryInfo.brands &&
            selectedSubCategoryInfo.brands.length ? (
              <div className={"my-2"}>
                <div className={"font-bold mb-2"}>
                  {makeFirstCapital(strings.brands)}
                </div>
                {selectedSubCategoryInfo.brands.map((brand) => (
                  <div
                    onClick={() =>
                      setSelectedBrand(
                        selectedBrand === brand.slug ? "" : brand.slug
                      )
                    }
                    className={"flex flex-row items-center"}
                  >
                    <input
                      className="w-4 h-4 cursor-pointer"
                      checked={selectedBrand === brand.slug}
                      type={"checkbox"}
                    />
                    <p
                      className={
                        "cursor-pointer ml-2 text-lg text-allbestcardBalck"
                      }
                    >
                      {brand.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <CheckboxContainer items={selectedSubCategoryFilter} />
          </div>

          <div
            style={{ height: "fit-content" }}
            className={`grid gap-1 px-10 mx-auto mt-4 ${
              xsm ? "grid-cols-1" : "grid-cols-2"
            } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5`}
          >
            <CardsContainer
              size={md ? "lg" : "base"}
              products={categoryProducts}
              hasBtn
            />
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="mt-8 p-0 ml-2">
          <h1 className="font-bold" style={{ fontSize: "30px" }}>
            {selectedSubCategoryInfo.name}
          </h1>
          <div className="w-full h-40 lg:h-72 mt-4">
            <img
              className="w-full h-full object-cover"
              src={`${base_url}${selectedSubCategoryInfo.banner}`}
              alt="banner image here"
            />
          </div>
          <div className="flex flex-wrap justify-center mt-6">
            {selectedSubCategories.map((category) => (
              <div className="flex mr-6" style={{ marginBottom: "30px" }}>
                <div
                  className={"cursor-pointer"}
                  onClick={() => router.push(`/category/${category.slug}`)}
                >
                  <div className="bg-customGrey-hoverHover h-36 w-32 p-4 border-2 border-customGrey rounded bg-customLightGray transition delay-75 duration-300 ease-in-out">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={`${base_url}${category.banner}`}
                      alt="sub category img"
                    />
                  </div>
                  <div className="w-32 ">
                    <p className="text-center">{category.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={"mt-8"}>
            <div style={{ fontSize: "22px" }} className={"font-bold"}>
              {makeFirstCapital(strings.allProducts)}
            </div>
            <div
              className={`grid gap-1 m-auto ${
                xsm ? "grid-cols-1" : "grid-cols-2"
              } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
            >
              <CardsContainer
                products={categoryProducts}
                size={md ? "lg" : "base"}
              />
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    ""
  );
};

const mapStateToProps = createStructuredSelector({
  categoryProducts: selectSelectedSubCategoryProducts,
  selectedSubCategoryId: selectSelectedSubCategoryId,
  selectedSubCategoryFilter: selectSelectedSubCategoryFilter,
  selectedSubCategoryInfo: selectSelectedSubCategoryInfo,
  selectedSubCategories: selectCategorySubCategories,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  getCategoryProductsStart: (link) => dispatch(getCategoryProductsStart(link)),
  setSelectedSubCategoryId: (categoryId, cb) =>
    dispatch(setSelectedSubCategoryId(categoryId, cb)),
  updateQueries: (categoryId, queries) =>
    dispatch(updateQueries(categoryId, queries)),
  getSelectedCategorySubCategoriesStart: (categoryId) =>
    dispatch(getSelectedCategorySubCategoriesStart(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
