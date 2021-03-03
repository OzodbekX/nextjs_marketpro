import React from "react";
import { connect } from "react-redux";

import SwiperContainer from "../../containers/SwiperContainer";
import FlexibleImage from "../../components/FlexibleImage";
import { divideArr } from "../../utils";
import { createStructuredSelector } from "reselect";
import { selectProductBrands } from "../../redux/selectors/product";
import { getBrandsStart } from "../../redux/modules/product/actions";
import { useEffect } from "react/cjs/react.development";

const BrandPage = ({ brandItems, getBrandsStart }) => {
  useEffect(() => {
    getBrandsStart();
  }, []);

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return brandItems ? (
    <div className="py-10">
      <div className="hidden lg:block">
        <SwiperContainer
          roundedControls
          count={divideArr(brandItems, 6, 4).length}
        >
          {divideArr(brandItems, 6, 4).map((brands) => (
            <div className={"grid grid-cols-6 justify-center"}>
              {brands &&
                brands.map((brand) => (
                  <div
                    key={
                      brand.links.products &&
                      brand.links.products.split("/")[
                        brand.links.products.split("/").length - 1
                      ]
                    }
                  >
                    {console.log(brand)}
                    <div className="w-40 h-40">
                      <FlexibleImage contain fullSize photo={brand.logo} />
                    </div>
                  </div>
                ))}
            </div>
          ))}

          {/* <div className="bg-blue-200 py-10">box 2</div> */}
        </SwiperContainer>
      </div>
      {alphabet.map((item, index) => (
        <div key={index}>
          <p className="text-left font-extrabold text-xl text-customDarkBlue mt-10">
            {item}
          </p>
          {brandItems.length ? (
            <div className="grid grid-cols-2 md:grid-cols-4">
              {brandItems.map(
                (brand, subIndex) =>
                  brand.name.toLowerCase()[0] === item.toLowerCase() && (
                    <p
                      key={subIndex}
                      style={{ width: "fit-content" }}
                      className={`text-left mt-2 text-sm cursor-pointer text-customBlue1-hover`}
                    >
                      {brand.name}
                    </p>
                  )
              )}
            </div>
          ) : (
            <p className="text-left font-bold text-base text-customDarkBlue mt-2">
              Not any
            </p>
          )}
        </div>
      ))}
    </div>
  ) : (
    ""
  );
};

const mapStateToProps = createStructuredSelector({
  brandItems: selectProductBrands,
});

const mapDispatchToProps = (dispatch) => ({
  getBrandsStart: () => dispatch(getBrandsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandPage);
