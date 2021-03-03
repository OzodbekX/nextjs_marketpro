import { connect } from "react-redux";
import { selectUserOpenedModal } from "../../redux/selectors/user";
import { createStructuredSelector } from "reselect";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OldFooter from "../../components/OldFooter";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const LayoutContainer = ({ children, openedModal }) => {
  const window = useMediaQuery(1200);
  let width = "1366px";

  window ? (width = "100%") : (width = "1366px");

  return (
    <div
      style={{
        maxWidth: width,
        margin: "0 auto",
        height: openedModal === 6 ? "100vh" : undefined,
        overflowY: openedModal === 6 ? "hidden" : undefined,
      }}
    >
      <Header />
      <div className="px-4">{children}</div>
      <Footer />
      {/* <OldFooter /> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  openedModal: selectUserOpenedModal,
});

export default connect(mapStateToProps)(LayoutContainer);
