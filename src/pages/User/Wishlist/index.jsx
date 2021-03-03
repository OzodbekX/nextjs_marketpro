import React from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import CardsContainer from "../../../containers/CardsContainer";
import { connect } from "react-redux";
import { selectUserWishlist } from "../../../redux/selectors/user";
import { createStructuredSelector } from "reselect";

const WishlistPage = ({ wishlist }) => {
  const md = useMediaQuery(768);
  const xsm = useMediaQuery(420);

  return wishlist.length ? (
    <div
      // className={`${
      //   !md
      //     ? "flex flex-row justify-around flex-wrap"
      //     : "grid grid-cols-2 items-center"
      // }`}
      className={`grid m-auto ${
        xsm ? "grid-cols-1" : "grid-cols-2"
      } md:grid-cols-3 lg:grid-cols-4 mt-4`}
    >
      <CardsContainer size={`${!md ? "base" : "xs"}`} products={wishlist} />
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  wishlist: selectUserWishlist,
});

export default connect(mapStateToProps)(WishlistPage);
