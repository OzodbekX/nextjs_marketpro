import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Range } from "rc-slider";
import { makeFirstCapital } from "../../utils";
import { strings } from "../../locales/strings";
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";
import { selectSelectedSubCategoryInfo } from "../../redux/selectors/product";
import { updateQueries } from "../../redux/modules/product/actions";

const Slider = ({ category, selectedSubCategoryInfo, updateQueries }) => {
  const router = useRouter();

  const [minMaxPrice, setMinMaxPrice] = useState([
    category.min_price,
    category.max_price,
  ]);

  useEffect(() => {
    if (router) {
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
        (qry) => !qry.includes("min_price")
      );

      const newNewArrayQueries = newArrayQueries.filter(
        (qry) => !qry.includes("max_price")
      );

      newNewArrayQueries.push(`min_price=${minMaxPrice[0]}`);
      newNewArrayQueries.push(`max_price=${minMaxPrice[1]}`);

      let newCurrentQueries = "";
      if (newNewArrayQueries.length) {
        newCurrentQueries = newNewArrayQueries.join("&");
      } else {
        newCurrentQueries = newNewArrayQueries.join("");
      }

      router.push(`${pathname}?${newCurrentQueries}`);
      updateQueries(selectedSubCategoryInfo.slug, newCurrentQueries);
    }
  }, [minMaxPrice]);

  return (
    <div>
      <div className={"font-bold"}>{makeFirstCapital(strings.price)}</div>
      <div className={"ml-2 mt-4 mr-4 pr-4"}>
        <Range
          defaultValue={minMaxPrice}
          min={category.min_price}
          max={category.max_price}
          onChange={(state) => setMinMaxPrice(state)}
        />
      </div>
      <div className={"mt-2 flex flex-row justify-between"}>
        <input
          type={"number"}
          defaultValue={minMaxPrice[0]}
          onChange={(e) => setMinMaxPrice([+e.target.value, minMaxPrice[1]])}
        />
        <input
          type={"number"}
          defaultValue={minMaxPrice[1]}
          onChange={(e) => setMinMaxPrice([minMaxPrice[0], +e.target.value])}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedSubCategoryInfo: selectSelectedSubCategoryInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateQueries: (categoryId, queries) =>
    dispatch(updateQueries(categoryId, queries)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
