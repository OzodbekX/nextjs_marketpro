import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectSellerDetails,
  selectBestSellerProducts,
  selectSellerFeaturedProducts,
  selectSellerTopSellingProducts,
} from "../../redux/selectors/product";
import {
  getSellerDetailsStart,
  getSellerProducts,
} from "../../redux/modules/product/actions";

import AllProducts from "../../pages/Seller/AllProducts";
import CardsContainer from "../../containers/CardsContainer";

import { FaShare, FaFacebook, FaOdnoklassnikiSquare } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";

import { strings } from "../../locales/strings";

const SellerPage = ({
  getSellerDetailsStart,
  seller,
  bestSellerProducts,
  getSellerProducts,
  topSellingProducts,
  featuredProducts,
}) => {
  const router = useRouter();

  const [allProducts, setAllProducts] = useState(false);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (router && router.query.id) {
      getSellerDetailsStart(router.query.id);
      getSellerProducts({ id: router.query.id });
    }
  }, [router.query.id]);

  return seller ? (
    <div>
      <div className="w-full p-6 flex justify-start items-center flex-grow">
        {seller.logo ? (
          <div className="w-20 h-20 mr-2 cursor-pointer">
            <img
              src="https://cdn1.ozone.ru/s3/marketing-api/banners/ns/c4/wc1450/nsc4zXKIlLJidHRGnx4wMtVRvp0oEYfN.jpg"
              alt="seller logo"
              className="rounded-full h-full border-box"
            />
          </div>
        ) : null}
        <div className="flex flex-col items-end ">
          <h1 className="	font-bold" style={{ fontSize: "38px" }}>
            {seller.name}
          </h1>
        </div>
        <div
          className="flex flex-col flex-start ml-auto mb-auto"
          onMouseLeave={() => setVisibility(false)}
          onMouseEnter={() => setVisibility(true)}
          onClick={() => setVisibility(!visibility)}
        >
          <FaShare />
          {visibility && (
            <div
              className="absolute z-50 bg-white  border-2 border-gray-300 rounded p-4"
              style={{ marginLeft: "-40px" }}
            >
              <div className="flex items-center border-b-2 hover:text-blue-400 border-gray-200 text-gray-600 m-2">
                <FaFacebook />
                <p className="ml-2">{"Facebook"}</p>
              </div>
              <div className="flex items-center border-b-2 hover:text-blue-400 border-gray-200 text-gray-600 m-2">
                <IoLogoTwitter />
                <p className="ml-2">{"Twitter"}</p>
              </div>
              <div className="flex items-center border-b-2 hover:text-blue-400 border-gray-200 text-gray-600 m-2">
                <FaOdnoklassnikiSquare />
                <p className="ml-2">{"ok.ru"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-48 justify-between items-center text-semibold mb-6 cursor-pointer">
        <p
          onClick={() => setAllProducts(false)}
          className={`${
            !allProducts ? "border-b-2 border-blue-400" : ""
          } p-2 cursor-pointer`}
        >
          {strings.home}
        </p>
        <p
          onClick={() => setAllProducts(true)}
          className={`${allProducts && " border-b-2 border-blue-400 p-2"}`}
        >
          {strings.allProducts}
        </p>
      </div>

      {!allProducts && (
        <section>
          <div>
            <img
              className="m-auto"
              src="https://cdn1.ozone.ru/s3/marketing-api/banners/ns/c4/wc1450/nsc4zXKIlLJidHRGnx4wMtVRvp0oEYfN.jpg"
              alt=""
            />
          </div>
          {/* <div className="grid grid-cols-6 justify-center">
            <CardsContainer
              products={seller.products}
              count={seller.products && seller.products.length}
            />
          </div> */}
          <h1 className="mt-5 ml-2">Top selling products</h1>
          <div className="mt-3 ml-2">
            <CardsContainer
              size="xs"
              count={6}
              selectedTag="bestseller"
              products={topSellingProducts}
            />
          </div>
          <h1 className="mt-5 ml-2">Featured products</h1>
          <div className="mt-3 ml-2">
            <CardsContainer
              size="xs"
              count={6}
              selectedTag="bestseller"
              products={featuredProducts}
            />
          </div>
        </section>
      )}

      {allProducts && (
        <div>
          <AllProducts />
        </div>
      )}
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  seller: selectSellerDetails,
  bestSellerProducts: selectBestSellerProducts,
  topSellingProducts: selectSellerTopSellingProducts,
  featuredProducts: selectSellerFeaturedProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getSellerDetailsStart: (sellerId) =>
    dispatch(getSellerDetailsStart(sellerId)),
  getSellerProducts: (payload) => dispatch(getSellerProducts(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerPage);
