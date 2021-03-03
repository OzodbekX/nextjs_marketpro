import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { pageConstants } from "../../constants";
import { createStructuredSelector } from "reselect";
import { selectPageHTML } from "../../redux/selectors/home";
import { getPageHTMLStart } from "../../redux/modules/home/actions";

const Pages = ({ getPageHTMLStart, pageHTML }) => {
  const router = useRouter();

  useEffect(() => {
    if (router && router.query.id) {
      getPageHTMLStart(pageConstants[router.query.id]);
    }
  }, [router, router.query.id]);

  return pageHTML ? (
    <div dangerouslySetInnerHTML={{ __html: `${pageHTML.content}` }} />
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  pageHTML: selectPageHTML,
});

const mapDispatchToProps = (dispatch) => ({
  getPageHTMLStart: (type) => dispatch(getPageHTMLStart(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
