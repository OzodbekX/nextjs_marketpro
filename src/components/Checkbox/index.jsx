import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";
import { selectSelectedSubCategoryInfo } from "../../redux/selectors/product";
import { updateQueries } from "../../redux/modules/product/actions";

const Checkbox = ({
  id,
  title,
  color,
  updateQueries,
  selectedSubCategoryInfo,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (router) {
      const currentPathname = router.asPath;
      const queries = currentPathname.split("?")[1];
      if (queries) {
        let arrayQueries = [];
        if (queries.includes("&")) {
          arrayQueries = queries.split("&");
        } else {
          arrayQueries[0] = queries;
        }
        arrayQueries.map(
          (qry) => qry.split("=")[1] === title && setChecked(true)
        );
      }
    }
  }, [router]);

  useEffect(() => {
    const currentPathname = router.asPath;
    const queries = currentPathname.split("?")[1];
    if (queries) {
      updateQueries(selectedSubCategoryInfo.slug, queries);
    }
  }, []);

  const onClick = () => {
    const currentPathname = router.asPath.split("?")[0].replaceAll("%3F", "");
    const currentQueries = router.asPath.split("?")[1];
    const objectKey = `attribute_${id}[]`;

    if (!checked) {
      const newQueries = `${
        currentQueries ? `${currentQueries}&` : ""
      }${objectKey}=${title}`;

      router.push(`${currentPathname}?${newQueries}`);

      if (newQueries) {
        updateQueries(selectedSubCategoryInfo.slug, newQueries);
      }

      setChecked(true);
    } else if (checked) {
      let arrayCurrentQueries = [];
      if (currentQueries.includes("&")) {
        arrayCurrentQueries = currentQueries.split("&");
      } else {
        arrayCurrentQueries[0] = currentQueries;
      }

      const arrayCurrentQueriesValue = [];
      arrayCurrentQueries.map((qry) => {
        if (qry.split("=")[0] === objectKey) {
          const values = qry.split("=")[1].split(",");
          values.map((v) => arrayCurrentQueriesValue.push(v));
        }
      });

      const newArrayCurrentQueries = arrayCurrentQueries.filter(
        (qry) => qry.split("=")[1] !== title
      );

      let newCurrentQueries = "";
      if (newArrayCurrentQueries.length) {
        newCurrentQueries = newArrayCurrentQueries.join("&");
      } else {
        newCurrentQueries = newArrayCurrentQueries.join("");
      }
      const newUrl = `${currentPathname}?${
        newCurrentQueries ? `${newCurrentQueries}` : ""
      }`;

      router.push(newUrl);

      updateQueries(selectedSubCategoryInfo.slug, newCurrentQueries);
      setChecked(false);
    }
  };

  return (
    <div className="flex items-center mb-2" onClick={onClick}>
      <input
        type="checkbox"
        checked={checked}
        className="w-4 h-4 cursor-pointer"
      />
      {color ? (
        <span className={`rounded-full w-4 h-4 ml-2 bg-${color}`} />
      ) : null}
      <p className="cursor-pointer ml-2 text-xl text-allbestcardBalck">
        {title}
      </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
