import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUserData,
  selectUserDataError,
  selectUserDataLoading,
  selectUserAccessToken,
  selectUserLanguage,
} from "../../../redux/selectors/user";
import { userDataChange } from "../../../redux/modules/user/action";

import ReactSelect from "react-select";
import Skeleton from "react-loading-skeleton";
import DefaultInput from "../../../components/common/DefaultInput";
import DefaultButton from "../../../components/common/DefaultButton";
import DefaultModal from "../../../components/common/DefaultModal";

import { FaRegSmileBeam } from "react-icons/fa";
import { VscCommentDiscussion } from "react-icons/vsc";

import moment from "moment";
import {
  changeArrToSelect,
  makeArray,
  makeFirstCapital,
  normalizePhoneNumber,
} from "../../../utils";
import { strings } from "../../../locales/strings";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import UserCardCount from "../../../components/UserCardCount";

const UserMainPage = ({
  user,
  userLoading,
  userError,
  userDataChange,
  accessToken,
  language,
}) => {
  const alert = useAlert();

  const [open, setOpen] = useState(null);

  const onClicked = (key, value = "") => {
    let obj = {
      key,
      value,
      error: "",
      focused: true,
    };
    if (key === "dateOfBirth") {
      obj.value = `${dateOfBirth.day ? dateOfBirth.day.value : "dd"}/${
        dateOfBirth.month ? dateOfBirth.month.value : "mm"
      }/${dateOfBirth.year ? dateOfBirth.year.value : "YYYY"}`;
    }
    if (key === "gender") {
      obj.value = gender ? gender.label : strings.selectGender;
    }
    setOpen({ ...obj });
  };

  useEffect(() => {
    if (open && open.key === "phone") {
      if (open.value.length > 7) {
        if (open.value[7] && open.value[7] !== " ") {
          let newStr = open.value.slice(0, 7) + " " + open.value.slice(7);
          setOpen({
            key: "phone",
            value: newStr,
            error: "",
          });
        }
        if (open.value[11] && open.value[11] !== " ") {
          let newStr = open.value.slice(0, 11) + " " + open.value.slice(11);
          setOpen({
            key: "phone",
            value: newStr,
            error: "",
          });
        }
      }
    }
  }, [open]);

  const onChange = (e) => {
    if (open.key === "phone") {
      let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let value = e.target.value;
      if (value.length === 12 && value[11] === " ") {
        setOpen({
          key: "phone",
          value,
          error: "",
        });
      }
      if (value.length === 8 && value[7] === " ") {
        setOpen({
          key: "phone",
          value,
          error: "",
        });
      }
      if (value.length === 5 && value[4] === " ") {
        setOpen({
          key: "phone",
          value,
          error: "",
        });
      }
      if (arr.find((n) => n === value[value.length - 1])) {
        if (open.value.length > 4) {
          setOpen({
            key: "phone",
            value,
            error: "",
          });
        } else {
          setOpen({
            key: "phone",
            value: `+998 ${value.replace(/\s/g, "").slice(4)}`,
            error: "",
          });
        }
      }

      return;
    }

    setOpen({ ...open, error: "", value: e.target.value });
  };

  const onKeyPress = (e) => {
    if (e.which !== 13) {
      return;
    }

    onSubmit();
  };

  const onSubmit = () => {
    let { key, value } = open;
    let originalKey = key;

    if (key === "fullName" || key === "email" || key === "name") {
      if (!value) {
        setOpen({
          ...open,
          error: makeFirstCapital(strings.fillField),
        });
        return;
      } else {
        if (key === "fullName") {
          originalKey = "full_name";
        }
      }
    }

    if (key === "phone") {
      value = value.replace(/\D/g, "");
      let phoneCodes = ["33", "90", "91", "93", "94", "95", "97", "98", "99"];
      if (
        !phoneCodes.find((e) => e === value.substr(3, 2)) ||
        value.length < 12
      ) {
        setOpen({
          ...open,
          error: makeFirstCapital(strings.enterPhoneCorrectly),
        });

        return;
      }
    }

    if (key === "dateOfBirth") {
      originalKey = "date_of_birth";

      if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
        setOpen({
          ...open,
          error: makeFirstCapital(strings.selectDataCorrectly),
        });

        return;
      }

      value = new Date(
        dateOfBirth.year.value,
        dateOfBirth.month.value - 1,
        dateOfBirth.day.value
      );
      value = moment(value).format("YYYY-MM-DD HH:mm:ss");
    }

    if (key === "gender") {
      if (!gender) {
        setOpen({
          ...open,
          error: makeFirstCapital(strings.selectDataCorrectly),
        });

        return;
      }

      value = gender.value;
    }

    userDataChange(
      {
        value,
        id: user.id,
        originalKey,
        token: accessToken,
        // key,
      },
      () => {
        setOpen(null);
        alert.success(strings.profileDataChangedSuccessfully);
      }
    );
  };

  const [dateOfBirth, setDateOfBirth] = useState({
    day: null,
    month: null,
    year: null,
  });

  useEffect(() => {
    if (user.date_of_birth) {
      let date = new Date(user.date_of_birth);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      setDateOfBirth({
        day: { value: day, label: day },
        month: { value: month, label: month },
        year: { value: year, label: year },
      });
    }
    if (user.gender) {
      if (parseInt(user.gender) === 1) {
        setGender({
          value: 1,
          label: strings.genderMale,
        });
      }
      if (parseInt(user.gender) === 2) {
        setGender({
          value: 2,
          label: strings.genderFemale,
        });
      }
    }
  }, []);

  const onChangeDay = (e) => {
    setOpen({
      ...open,
      error: "",
      value: `${e.value || "dd"}/${
        dateOfBirth.month ? dateOfBirth.month.value : "mm"
      }/${dateOfBirth.year ? dateOfBirth.year.value : "YYYY"}`,
    });
    setDateOfBirth({
      ...dateOfBirth,
      day: e,
    });
  };

  const onChangeMonth = (e) => {
    setOpen({
      ...open,
      error: "",
      value: `${dateOfBirth.day ? dateOfBirth.day.value : "dd"}/${
        e.value || "mm"
      }/${dateOfBirth.year ? dateOfBirth.year.value : "YYYY"}`,
    });
    setDateOfBirth({
      ...dateOfBirth,
      month: e,
    });
  };

  const onChangeYear = (e) => {
    setOpen({
      ...open,
      error: "",
      value: `${dateOfBirth.day ? dateOfBirth.day.value : "dd"}/${
        dateOfBirth.month ? dateOfBirth.month.value : "mm"
      }/${e.value || "YYYY"}`,
    });
    setDateOfBirth({
      ...dateOfBirth,
      year: e,
    });
  };

  const [gender, setGender] = useState(null);

  const onChangeGender = (e) => {
    setOpen({
      ...open,
      error: "",
      value: e.label,
    });
    setGender(e);
  };

  const md = useMediaQuery(768);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <>
      {!!open && (
        <DefaultModal closeBtn onClose={() => setOpen(null)}>
          <h2 className="text-customDarkBlue text-xl text-center font-extrabold mt-2">
            {makeFirstCapital(strings.changeProfileData)}
          </h2>

          <div
            className="relative mt-5"
            onClick={() => setOpen({ ...open, focused: true })}
          >
            <DefaultInput
              value={open.value}
              error={open.error}
              onChange={onChange}
              focused={open.focused}
              onKeyPress={onKeyPress}
              onBlur={() => setOpen({ ...open, focused: false })}
              onFocus={() => setOpen({ ...open, focused: false })}
              maxLength={open.key === "phone" ? 16 : undefined}
              disabled={open.key === "dateOfBirth" || open.key === "gender"}
            />

            <span
              onClick={() => setOpen({ ...open, focused: true })}
              className="absolute left-2 text-sm text-gray-400"
            >
              {strings[open.key]}
            </span>
            {open.key !== "dateOfBirth" && open.key !== "gender" ? (
              <p className="text-xs text-center mt-2 text-red-500">
                {userError || open.error}
              </p>
            ) : null}
          </div>

          {open.key === "dateOfBirth" || open.key === "gender" ? (
            <>
              <div
                className={`mt-5 ${
                  open.key === "gender" ? "" : "flex justify-between"
                }`}
              >
                {open.key === "gender" ? (
                  <div className="bg-blue-100">
                    <ReactSelect
                      value={gender}
                      onChange={onChangeGender}
                      placeholder={strings.selectGender}
                      options={[
                        { value: 1, label: strings.genderMale },
                        { value: 2, label: strings.genderFemale },
                      ]}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ width: "30%" }}>
                      <ReactSelect
                        onChange={onChangeDay}
                        value={dateOfBirth.day}
                        placeholder={strings.day}
                        options={changeArrToSelect(makeArray(31))}
                      />
                    </div>
                    <div style={{ width: "30%" }}>
                      <ReactSelect
                        onChange={onChangeMonth}
                        value={dateOfBirth.month}
                        placeholder={strings.month}
                        options={changeArrToSelect(makeArray(12))}
                      />
                    </div>
                    <div style={{ width: "30%" }}>
                      <ReactSelect
                        onChange={onChangeYear}
                        value={dateOfBirth.year}
                        placeholder={strings.year}
                        options={changeArrToSelect(
                          makeArray(2020 - 1960, 1960)
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
              <p className="text-xs text-center mt-2 text-red-500">
                {userError || open.error}
              </p>
            </>
          ) : null}

          <div className="mt-5" />
          <DefaultButton
            loading={userLoading}
            textColor={"white"}
            paddingSize={"py-3"}
            bgColor={"blue-500"}
            onClick={onSubmit}
            // disabled={phone.data.length < 16}
            text={makeFirstCapital(strings.save)}
          />
        </DefaultModal>
      )}
      <div className="mb-8">
        <UserCardCount />
      </div>
      <div className="flex w-11/12 ">
        <div className="text-2xl mr-4 ">
          {userLoading ? (
            <Skeleton width={30} height={30} circle />
          ) : (
            <FaRegSmileBeam />
          )}
        </div>
        <div className="w-full">
          {userLoading ? (
            <div className="mb-2">
              <Skeleton width={200} height={30} />
            </div>
          ) : (
            <h1 className="font-bold  text-lg mb-2">
              {makeFirstCapital(strings.credentials)}
            </h1>
          )}
          {userLoading ? (
            <div className="w-9/12 mb-5">
              <Skeleton width={"100%"} height={25} count={2} />
            </div>
          ) : (
            <p className="w-9/12 mb-2">
              {`${makeFirstCapital(strings.longText1)} `}
              <span className="text-blue-500">CityMag</span>
            </p>
          )}
          <div
            className={`flex ${
              !md ? "flex-row" : "flex-col"
            } w-9/12 justify-between`}
          >
            <div>
              {userLoading ? (
                <div style={{ width: "200px" }}>
                  <Skeleton width={"100%"} height={15} />
                  <Skeleton width={"100%"} height={20} />
                  <div className="mt-1" />
                  <Skeleton width={"100%"} height={15} />
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-gray-400">
                    {makeFirstCapital(strings.name)}
                  </span>
                  <p className="text-sm font-semibold text-gray-600">
                    {user.name || makeFirstCapital(strings.notSpecified)}
                  </p>
                  <button
                    onClick={() => onClicked("name", user.name)}
                    className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600"
                  >
                    {makeFirstCapital(strings.change)}
                  </button>
                </div>
              )}
              {userLoading ? (
                <div style={{ width: "200px" }}>
                  <Skeleton width={"100%"} height={15} />
                  <Skeleton width={"100%"} height={20} />
                  <div className="mt-1" />
                  <Skeleton width={"100%"} height={15} />
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-gray-400">
                    {makeFirstCapital(strings.dateOfBirth)}
                  </span>
                  <p className="text-sm font-semibold text-gray-600">
                    {user.date_of_birth
                      ? moment(new Date(user.date_of_birth)).format(
                          "DD-MM-YYYY"
                        )
                      : makeFirstCapital(strings.notSpecified)}
                  </p>
                  <button
                    onClick={() => onClicked("dateOfBirth", user.date_of_birth)}
                    className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600"
                  >
                    {makeFirstCapital(strings.change)}
                  </button>
                </div>
              )}
              {userLoading ? (
                <div style={{ width: "200px" }}>
                  <Skeleton width={"100%"} height={15} />
                  <Skeleton width={"100%"} height={20} />
                  <div className="mt-1" />
                  <Skeleton width={"100%"} height={15} />
                </div>
              ) : (
                <div>
                  <span className="text-xs font-semibold text-gray-400">
                    {makeFirstCapital(strings.gender)}
                  </span>
                  <p className="text-sm font-semibold text-gray-600">
                    {user.gender
                      ? parseInt(user.gender) === 1
                        ? strings.genderMale
                        : strings.genderFemale
                      : makeFirstCapital(strings.notSpecified)}
                  </p>
                  <button
                    onClick={() => onClicked("gender", user.gender)}
                    className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600"
                  >
                    {makeFirstCapital(strings.change)}
                  </button>
                </div>
              )}
            </div>

            <div>
              {userLoading ? (
                <div style={{ width: "200px" }}>
                  <Skeleton width={"100%"} height={15} />
                  <Skeleton width={"100%"} height={20} />
                  <div className="mt-1" />
                  <Skeleton width={"100%"} height={15} />
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-gray-400">
                    {makeFirstCapital(strings.phone)}
                  </span>
                  <p className="text-sm font-semibold text-gray-600">
                    {user.phone
                      ? normalizePhoneNumber(user.phone)
                      : makeFirstCapital(strings.notSpecified)}
                  </p>
                  <button
                    onClick={() =>
                      onClicked(
                        "phone",
                        normalizePhoneNumber(user.phone || "998")
                      )
                    }
                    className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600"
                  >
                    {makeFirstCapital(strings.change)}
                  </button>
                </div>
              )}

              {userLoading ? (
                <div style={{ width: "200px" }}>
                  <Skeleton width={"100%"} height={15} />
                  <Skeleton width={"100%"} height={20} />
                  <div className="mt-1" />
                  <Skeleton width={"100%"} height={15} />
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-gray-400">
                    {makeFirstCapital(strings.mail)}
                  </span>
                  <p className="text-sm font-semibold text-gray-600">
                    {user.email || makeFirstCapital(strings.notSpecified)}
                  </p>
                  <button
                    onClick={() => onClicked("email", user.email)}
                    className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600"
                  >
                    {makeFirstCapital(strings.change)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-8">
        <div className="text-2xl mr-4">
          {userLoading ? (
            <Skeleton width={30} height={30} circle />
          ) : (
            <VscCommentDiscussion />
          )}
        </div>
        <div className="w-full">
          {userLoading ? (
            <div className="mb-2">
              <Skeleton width={200} height={30} />
            </div>
          ) : (
            <h1 className="font-bold text-lg mb-2">
              {makeFirstCapital(strings.publicData)}
            </h1>
          )}
          {userLoading ? (
            <div className="w-9/12 mb-5">
              <Skeleton width={"100%"} height={25} count={2} />
            </div>
          ) : (
            <p className="w-9/12 mb-2">{makeFirstCapital(strings.longText2)}</p>
          )}
          <div>
            {userLoading ? (
              <div style={{ width: "200px" }}>
                <Skeleton width={"100%"} height={15} />
                <Skeleton width={"100%"} height={20} />
                <div className="mt-1" />
                <Skeleton width={"100%"} height={15} />
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-gray-400">
                  {strings.fullName}
                </span>
                <p className="text-sm font-bold text-gray-600">
                  {user.full_name || makeFirstCapital(strings.notSpecified)}
                </p>
                <button
                  onClick={() => onClicked("fullName", user.full_name)}
                  className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600"
                >
                  {makeFirstCapital(strings.change)}
                </button>
              </div>
            )}

            {/* <div>
              <span className="text-xs font-bold text-gray-400">
                {`${makeFirstCapital(strings.country)}, ${makeFirstCapital(
                  strings.city
                )}`}
              </span>
              <p className="text-sm font-bold text-gray-600">
                {user.country ||
                  user.city ||
                  makeFirstCapital(strings.notSpecified)}
              </p>
              <button className="mb-4 focus:outline-none text-xs text-blue-400 hover:text-blue-600">
                {makeFirstCapital(strings.change)}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUserData,
  userLoading: selectUserDataLoading,
  userError: selectUserDataError,
  accessToken: selectUserAccessToken,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  userDataChange: (payload, cb, errorCb) =>
    dispatch(userDataChange(payload, cb, errorCb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMainPage);
