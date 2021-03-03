import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCategories,
  selectCategorySubCategories,
} from "../../redux/selectors/product";
import {
  getSelectedCategorySubCategoriesStart,
  setSelectedSubCategoryId,
} from "../../redux/modules/product/actions";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
import styled from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { strings } from "../../locales/strings";

const Catalog = ({
  categories,
  categorySubCategories,
  setSelectedSubCategoryId,
  setCatalogToggle,
  getSelectedCategorySubCategoriesStart,
}) => {
  const [catalogIndex, setCatalogIndex] = useState(0);

  const [modalShow, setModalShow] = useState(true);

  const router = useRouter();
  const md = useMediaQuery(768);
  const sm = useMediaQuery(555);

  useEffect(() => {
    md ? setModalShow(false) : setModalShow(true);
  }, [md]);

  const ColumnCount = styled.div`
    ${md && !sm
      ? "column-count: 3;"
      : sm
      ? "column-count: 2;"
      : "column-count: 4;"}
  `;

  useEffect(() => {
    if (categories.length) {
      getSelectedCategorySubCategoriesStart(categories[0].slug);
    }
  }, [categories]);

  return (
    <div
      className={`w-full absolute focus:ri left-0 shadow-catalog text-black`}
      style={{
        background: `${
          md
            ? "#f8f8f8"
            : "linear-gradient( to right,#F8F8F8 0%,#F8F8F8 50%,#ffffff 50%, #ffffff 100%)"
        }`,
      }}
    >
      {/* Catalog Container */}
      <div
        className={`
                container mx-auto
                grid grid-cols-5
                ${!md ? "grid grid-cols-5" : "flex flex-row justify-between"}
                bg-white`}
      >
        {/* Catalog Left Side */}
        <div
          className={`modalBg col-span-1 ${
            md ? "col-span-5 pt-0" : "pt-4"
          } flex flex-col`}
        >
          {categories &&
            categories.map((category, index) => (
              <div
                key={category.slug}
                className={
                  "hover:bg-white text-customBlue1-hover flex justify-between cursor-pointer text-left text-sm py-2.5 pr-4 pl-9 " +
                  (catalogIndex === index ? "bg-white text-customBlue1" : "")
                }
                onMouseEnter={() => {
                  setCatalogIndex(index);
                  getSelectedCategorySubCategoriesStart(category.slug);
                  setModalShow(true);
                }}
                onClick={() => setModalShow(true)}
              >
                <div
                  className={"cursor-pointer"}
                  onClick={() => {
                    setCatalogToggle(false);
                    router.push(`/category/${category.slug}`);
                  }}
                >
                  {category.name}
                </div>
                {md && <HiOutlineChevronRight />}
              </div>
            ))}
        </div>

        {/* Catalog Right Side */}
        {modalShow && (
          <ColumnCount
            className={`${
              md
                ? `absolute left-0 right-0 modalBg px-4`
                : "col-span-4 pt-4 pl-10"
            }`}
          >
            {categorySubCategories &&
              categorySubCategories.map((subcategory, index) => (
                <div>
                  {md && modalShow && index === 0 && (
                    <div className="w-full flex justify-between">
                      <div
                        onClick={() => setModalShow(false)}
                        className="flex pt-4 justify-start items-center text-customBlue1 text-md"
                        // className="absolute w-full flex justify-center items-center left-0 -mt-7 text-customBlue1 text-md"
                      >
                        <HiOutlineChevronLeft />
                        {strings.back}
                      </div>
                    </div>
                  )}
                  <div className={"px-2 pt-4 inline-block box-border mb-4"}>
                    <p
                      onClick={() => {
                        setSelectedSubCategoryId(subcategory.slug);
                        setCatalogToggle(false);
                        router.push(`/category/${subcategory.slug}`);
                      }}
                      key={index}
                      className="
                      hover:bg-white text-customBlue1-hover
                      cursor-pointer
                      text-left font-bold text-customDarkBlue text-sm mb-3"
                    >
                      {subcategory.name}
                    </p>
                    {subcategory.sub_categories &&
                      subcategory.sub_categories.map((subSubCategory) => (
                        <div
                          onClick={() => {
                            router.push(`/category/${subSubCategory.slug}`);
                            setCatalogToggle(false);
                          }}
                          className="text-customLightBlack mb-2 text-customBlue2-hover text-xs sm:text-sm"
                        >
                          <Link href="/">{subSubCategory.name}</Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </ColumnCount>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  categorySubCategories: selectCategorySubCategories,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedSubCategoryId: (subCategoryId) =>
    dispatch(setSelectedSubCategoryId(subCategoryId)),
  getSelectedCategorySubCategoriesStart: (categoryId) =>
    dispatch(getSelectedCategorySubCategoriesStart(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
