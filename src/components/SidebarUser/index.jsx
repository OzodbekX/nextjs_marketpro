import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { base_url, userSidebarItems } from "../../constants";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUserAccessToken,
  selectUserData,
  selectUserDataError,
  selectUserDataLoading,
  selectUserOpenedModal,
  selectUserLanguage,
} from "../../redux/selectors/user";
import { handleModal, userDataChange } from "../../redux/modules/user/action";

import Cropper from "react-cropper";
import Skeleton from "react-loading-skeleton";
import DefaultButton from "../../components/common/DefaultButton";

import { CgProfile } from "react-icons/cg";
import { BiCamera } from "react-icons/bi";

import { makeFirstCapital } from "../../utils";
import { strings } from "../../locales/strings";
import SidebarContainer from "../../containers/SidebarContainer";
import { useRouter } from "next/router";

const SidebarUser = ({
  data,
  openedModal,
  userLoading,
  userError,
  accessToken,
  handleModal,
  userDataChange,
  language,
}) => {
  const alert = useAlert();
  const router = useRouter();

  const [showIcon, setShowIcon] = useState(false);

  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();

    if (e.target.files.length) {
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      handleModal(5);
    }
  };

  const onSave = () => {
    if (typeof cropper === "undefined") {
      return;
    }

    let fm = new FormData();
    fm.append("avatar", cropper.getCroppedCanvas().toDataURL());

    userDataChange(
      {
        value: fm,
        id: data.id,
        token: accessToken,
        originalKey: "avatar",
        // key: "avatar",
        // originalValue: cropper.getCroppedCanvas().toDataURL(),
      },
      () => {
        alert.success(strings.profileDataChangedSuccessfully);
      }
    );
  };

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div className="mr-5 w-52">
      {openedModal === 5 ? (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen overflow-hidden flex justify-center items-center">
          <div
            style={{ zIndex: -1 }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"
          />
          <div className="bg-white px-8 py-4">
            <div
              style={{
                width: "540px",
                height: "360px",
              }}
              className="bg-gray-400"
            >
              <Cropper
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                initialAspectRatio={1}
                src={image}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
              {/* <img
              src={image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            /> */}
            </div>
            <div className="pt-5 flex justify-center">
              <DefaultButton
                onClick={onSave}
                loading={userLoading}
                paddingSize={"py-2 px-5"}
                text={makeFirstCapital(strings.save)}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col items-center">
        <input
          id="cover"
          type="file"
          onChange={onChange}
          accept=".png, .jpg, .jpeg"
          style={{ display: "none" }}
        />
        <label
          htmlFor="cover"
          onMouseMove={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
          className={`bg-gray-100 inline-block rounded-full relative overflow-hidden ${
            data.avatar ? "" : "p-6"
          }`}
        >
          {userLoading ? (
            <Skeleton width={120} height={120} circle />
          ) : data.avatar ? (
            <div style={{ width: 120, height: 120 }}>
              <img
                src={`${base_url}${data.avatar}`}
                // src={data.avatar}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <CgProfile size={60} color={"#005bff"} />
          )}
          {/* {data.avatar ? (
            <div style={{ width: 120, height: 120 }}>
              <img
                src={`${base_url}${data.avatar}`}
                // src={data.avatar}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            <CgProfile size={60} color={"#005bff"} />
          )} */}
          {!userLoading && showIcon ? (
            <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black opacity-70 cursor-pointer">
              <BiCamera size={32} color={"#f2f3f5"} />
            </div>
          ) : null}
        </label>
        <label htmlFor="cover">
          {router.asPath.includes("/user/main") && userLoading ? (
            <div className="mt-3">
              {/* box */}
              <Skeleton width={120} height={20} />
            </div>
          ) : (
            <div className="mt-3 text-sm text-center cursor-pointer text-customBlue1 text-customBlue2-hover">
              {makeFirstCapital(
                data.avatar
                  ? strings.changeProfilePhoto
                  : strings.addProfilePhoto
              )}
            </div>
          )}
        </label>
      </div>
      <div className="mt-8" />
      <SidebarContainer items={userSidebarItems} fontSize="small" />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: selectUserData,
  userLoading: selectUserDataLoading,
  userError: selectUserDataError,
  openedModal: selectUserOpenedModal,
  accessToken: selectUserAccessToken,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  userDataChange: (payload, cb, errorCb) =>
    dispatch(userDataChange(payload, cb, errorCb)),
  handleModal: (value) => dispatch(handleModal(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarUser);
