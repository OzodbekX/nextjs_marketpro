import React, { useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUserLoggedOut,
  selectUserDataLoading,
  selectUserLanguage,
} from "../../redux/selectors/user";
import { handleModal } from "../../redux/modules/user/action";

import Skeleton from "react-loading-skeleton";
import LayoutContainer from "../LayoutContainer";
import SidebarUser from "../../components/SidebarUser";

import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const LayoutContainerUser = ({
  loading,
  children,
  loggedOut,
  handleModal,
  language,
}) => {
  const md = useMediaQuery(768);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <LayoutContainer>
      <div className="py-12">
        {loggedOut ? (
          <div className="py-10 flex flex-col justify-center items-center">
            {loading ? (
              <Skeleton width={300} height={35} />
            ) : (
              <div className="text-customDarkBlue font-extrabold text-2xl">
                {makeFirstCapital(strings.notLoggedIn)}
              </div>
            )}
            {loading ? (
              <div className="mt-5">
                <Skeleton width={400} height={35} />
              </div>
            ) : (
              <div className="mt-5 text-sm text-customDarkBlue">
                {`${makeFirstCapital(
                  strings.toAccessYourPersonalAccountYouNeed
                )} `}
                <span
                  onClick={() => handleModal(1)}
                  className="text-blue-600 cursor-pointer"
                >
                  {makeFirstCapital(strings.login)}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${
              !md ? "flex justify-between" : "flex flex-col items-center"
            }`}
          >
            <SidebarUser />
            <div className={`${!md ? "w-full" : "w-11/12"}`}>{children}</div>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedOut: selectUserLoggedOut,
  loading: selectUserDataLoading,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  handleModal: (value) => dispatch(handleModal(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutContainerUser);
