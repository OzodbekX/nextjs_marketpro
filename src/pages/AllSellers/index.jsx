import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectAllMarkets } from "../../redux/selectors/product";
import { getAllMarketsStart } from "../../redux/modules/product/actions";
import AllMarketsContainer from "../../containers/AllMarketsContainer";

const AllSellersPage = ({ allMarkets, getAllMarketsStart }) => {
  useEffect(() => {
    getAllMarketsStart();
  }, []);

  return (
    <div>
      <AllMarketsContainer items={allMarkets} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allMarkets: selectAllMarkets,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMarketsStart: () => dispatch(getAllMarketsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSellersPage);
