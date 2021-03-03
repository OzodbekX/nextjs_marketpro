import { MdSearch } from "react-icons/md";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { base_url } from "../../constants";
import {
  selectSearchTextResultsProducts,
  selectSearchTextResultsCategories,
  selectSearchTextResultsKeywords,
} from "../../redux/selectors/product";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";

const SearchDropdown = ({
  searchTextResultsKeywords,
  searchTextResultsProducts,
  searchTextResultsCategories,
  setText,
}) => {
  const router = useRouter();
  const sm = useMediaQuery(470);
  const md = useMediaQuery(768);

  return (
    <>
      <div className="shadow-catalog">
        {searchTextResultsKeywords && searchTextResultsKeywords.length
          ? searchTextResultsKeywords.map((item, i) => {
              if (i < 5) {
                return (
                  <div
                    onClick={() => setText(item)}
                    key={i}
                    className="flex justify-between items-center cursor-pointer group bg-customGrey-hoverBottom"
                  >
                    <div
                      className={`w-1/12 flex justify-center items-center  ${
                        md ? "text-xl" : "text-2xl"
                      } py-2 mr-2 text-customGreyText`}
                    >
                      <MdSearch />
                    </div>
                    <div className="w-11/12 relative py-2 flex justify-between items-center text-base text-customDarkBlue">
                      <div
                        className={`p-${sm ? 1 : 2} text-${
                          sm ? "sm" : "base"
                        } group-text-customBlue1-hover`}
                      >
                        {item}
                      </div>
                      <div className="ml-2 mr-1 text-customGreyText">
                        <HiOutlineChevronRight />
                      </div>
                      <div className="h-px w-full absolute bottom-0 shadow-catalog" />
                    </div>
                  </div>
                );
              }
            })
          : null}
        {searchTextResultsCategories && searchTextResultsCategories.length
          ? searchTextResultsCategories.map((item, i) => {
              if (i < 4) {
                return (
                  <div
                    onClick={() => {
                      setText("");
                      router.push(`/category/${item.slug}`);
                    }}
                    key={i}
                    className="flex justify-between items-center cursor-pointer group bg-customGrey-hoverBottom"
                  >
                    <div className="w-1/12 flex justify-center items-center  text-2xl py-2 mr-2 text-customGreyText">
                      {item.banner ? (
                        <img
                          className={`${
                            sm ? "h-14" : "h-20"
                          } m-auto object-contain`}
                          src={`${base_url}${item.banner}`}
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="w-11/12 relative py-2 flex justify-between items-center text-base text-customDarkBlue">
                      <div>
                        <div
                          className={`p-${sm ? 1 : 2} text-${
                            sm ? "sm" : "base"
                          } group-text-customBlue1-hover`}
                        >
                          {item.name}
                        </div>
                      </div>
                      <div className="ml-2 mr-1 text-customGreyText">
                        <HiOutlineChevronRight />
                      </div>
                      <div className="h-px w-full absolute bottom-0 shadow-catalog" />
                    </div>
                  </div>
                );
              }
            })
          : null}

        {searchTextResultsProducts && searchTextResultsProducts.length
          ? searchTextResultsProducts.map((item, i) => {
              if (i < 3) {
                return (
                  <div
                    onClick={() => {
                      setText("");
                      router.push(`/product/${item.slug}`);
                    }}
                    key={i}
                    className="flex justify-between items-center cursor-pointer group bg-customGrey-hoverBottom"
                  >
                    <div className="w-1/12 flex justify-center items-center  text-2xl py-2 mr-2 text-customGreyText" />
                    <div className="w-11/12 relative py-2 flex justify-between items-center text-base text-customDarkBlue">
                      <div className="w-full flex justify-between">
                        <div className="w-5/6">
                          <div
                            className={`p-${sm ? 1 : 2} text-${
                              sm ? "sm" : "base"
                            } group-text-customBlue1-hover`}
                          >
                            {item.name}
                          </div>
                          <div
                            className={`p-${sm ? 1 : 2} text-${
                              sm ? "sm" : "base"
                            } font-bold`}
                          >
                            {item.unit_price}
                          </div>
                        </div>
                        {item.thumbnaile_image ? (
                          <div className="w-1/6">
                            <img
                              className={`${
                                sm ? "h-14" : "h-20"
                              } m-auto object-contain`}
                              src={`${base_url}${item.thumbnaile_image}`}
                              alt=""
                            />
                          </div>
                        ) : (
                          <img
                            className="w-1/6 m-auto"
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="ml-2 mr-1 text-customGreyText">
                        <HiOutlineChevronRight />
                      </div>
                      <div className="h-px w-full absolute bottom-0 shadow-catalog" />
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  searchTextResultsCategories: selectSearchTextResultsCategories,
  searchTextResultsProducts: selectSearchTextResultsProducts,
  searchTextResultsKeywords: selectSearchTextResultsKeywords,
});

export default connect(mapStateToProps)(SearchDropdown);
