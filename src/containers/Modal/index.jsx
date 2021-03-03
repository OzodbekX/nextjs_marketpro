import React, { useState, useEffect } from "react";

import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUserOpenedModal,
  selectUserAuthLoading,
  selectUserAuthError,
} from "../../redux/selectors/user";
import {
  handleModal,
  signInEnterPhone,
  signInEnterOtp,
  signUp,
  logIn,
} from "../../redux/modules/user/action";

import Switch from "react-switch";
import Checkbox from "@material/react-checkbox";
import OtpInput from "../../components/common/OtpInput";
import DefaultModal from "../../components/common/DefaultModal";
import DefaultInput from "../../components/common/DefaultInput";
import DefaultButton from "../../components/common/DefaultButton";

import { BsX } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { makeFirstCapital, splitArr } from "../../utils";
import { strings } from "../../locales/strings";

let initialFilterValues = [
  {
    title: "aaa",
    value: false,
  },
  {
    title: "bbb",
    box: {
      show: false,
      items: {
        data: [
          {
            title: "bbb item 1",
            value: false,
          },
          {
            title: "bbb item 2",
            value: false,
          },
          {
            title: "bbb item 3",
            value: false,
          },
          {
            title: "bbb item 4",
            value: false,
          },
          {
            title: "bbb item 5",
            value: false,
          },
          {
            title: "bbb item 6",
            value: false,
          },
          {
            title: "bbb item 7",
            value: false,
          },
          {
            title: "bbb item 8",
            value: false,
          },
          {
            title: "bbb item 9",
            value: false,
          },
          {
            title: "bbb item 10",
            value: false,
          },
        ],
      },
    },
  },
  {
    title: "ccc",
    box: {
      show: false,
      items: {
        data: [
          {
            title: "ccc item 1",
            value: false,
          },
          {
            title: "ccc item 2",
            value: false,
          },
          {
            title: "ccc item 3",
            value: false,
          },
        ],
      },
    },
  },
  {
    title: "ddd",
    box: {
      show: false,
      items: {
        data: [
          {
            title: "ddd item 1",
            value: false,
          },
          {
            title: "ddd item 2",
            value: false,
          },
          {
            title: "ddd item 3",
            value: false,
          },
        ],
      },
    },
  },
  {
    title: "eee",
    value: false,
  },
];

const initialRegisterData = {
  name: "",
  email: "",
  password1: "",
  password2: "",
};

const initialRegisterErr = {
  name: "",
  email: "",
  password1: "",
  password2: "",
};

const initialRegisterFocus = {
  name: false,
  email: false,
  password1: false,
  password2: false,
};

const initialLoginData = {
  email: "",
  password: "",
  remember_me: false,
};

const initialLoginErr = {
  email: "",
  password: "",
};

const initialLoginFocus = {
  email: false,
  password: false,
};

const Modal = ({
  openedModal,
  handleModal,
  signInEnterPhone,
  signInEnterOtp,
  authLoading,
  authError,
  signUp,
  logIn,
}) => {
  const alert = useAlert();

  const mini = useMediaQuery(400);
  const sm = useMediaQuery(576);
  const md = useMediaQuery(768);
  const lg = useMediaQuery(991);

  const [phone, setPhone] = useState({
    data: "+998 ",
    error: "",
    focused: true,
  });

  const [otp, setOtp] = useState({
    data: "",
    error: "",
  });

  const [register, setRegister] = useState({
    data: initialRegisterData,
    error: initialRegisterErr,
    focused: initialRegisterFocus,
  });

  const [login, setLogin] = useState({
    data: initialLoginData,
    error: initialLoginErr,
    focused: initialLoginFocus,
  });

  const [filterValues, setFilterValues] = useState([...initialFilterValues]);

  const effect = () => {
    setLogin({
      ...login,
      focused: { ...initialLoginFocus, email: true },
    });
    setRegister({
      ...register,
      focused: { ...initialRegisterFocus, name: true },
    });

    let arr = [...filterValues];
    filterValues.map((e, i) => {
      if (e.box && e.box.items.data.length > 5) {
        arr[i].box.items.show = { value: false };
      }
    });
  };

  useEffect(() => {
    effect();
  }, []);

  useEffect(() => {
    if (phone.data.length > 7) {
      if (phone.data[7] && phone.data[7] !== " ") {
        let newStr = phone.data.slice(0, 7) + " " + phone.data.slice(7);
        setPhone({
          ...phone,
          data: newStr,
          error: "",
        });
      }
      if (phone.data[11] && phone.data[11] !== " ") {
        let newStr = phone.data.slice(0, 11) + " " + phone.data.slice(11);
        setPhone({
          ...phone,
          data: newStr,
          error: "",
        });
      }
    }
  }, [phone.data]);

  const onPhoneChange = (e) => {
    let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let value = e.target.value;
    if (value.length === 12 && value[11] === " ") {
      setPhone({
        ...phone,
        data: value,
        error: "",
      });
    }
    if (value.length === 8 && value[7] === " ") {
      setPhone({
        ...phone,
        data: value,
        error: "",
      });
    }
    if (value.length === 5 && value[4] === " ") {
      setPhone({
        ...phone,
        data: value,
        error: "",
      });
    }
    if (arr.find((n) => n === value[value.length - 1])) {
      if (phone.data.length > 4) {
        setPhone({
          ...phone,
          data: value,
          error: "",
        });
      } else {
        setPhone({
          ...phone,
          data: `+998 ${value.replace(/\s/g, "").slice(4)}`,
          error: "",
        });
      }
    }
  };

  const onPhoneSubmit = () => {
    let phoneCodes = ["33", "90", "91", "93", "94", "95", "97", "98", "99"];
    let value = phone.data.replace(/\D/g, "");
    if (!phoneCodes.find((e) => e === value.substr(3, 2))) {
      setPhone({
        ...phone,
        error: makeFirstCapital(strings.enterPhoneCorrectly),
      });

      return;
    }

    signInEnterPhone({ phone: value });
    handleModal(2);
  };

  const onOtpSubmit = () => {
    signInEnterOtp(
      { phone: phone.data.replace(/\D/g, ""), otp: otp.data },
      () => {
        alert.success(strings.loggedInSuccessfully);
      }
    );
  };

  const onRegisterChange = ({ target }) => {
    setRegister({
      ...register,
      data: {
        ...register.data,
        [target.name]: target.value,
      },
    });
  };

  const onRegisterSubmit = () => {
    const { name, email, password1, password2 } = register.data;

    let errObj = { ...initialRegisterErr };

    if (!name || !email || !password1 || !password2) {
      if (!name) {
        errObj.name = makeFirstCapital(strings.fillField);
      }
      if (!email) {
        errObj.email = makeFirstCapital(strings.fillField);
      }
      if (!password1) {
        errObj.password1 = makeFirstCapital(strings.fillField);
      }
      if (!password2) {
        errObj.password2 = makeFirstCapital(strings.fillField);
      }

      setRegister({
        ...register,
        error: errObj,
      });
      return;
    }

    if (password1 !== password2) {
      errObj.password2 = makeFirstCapital(strings.passwordsDoNotMatch);

      setRegister({
        ...register,
        error: errObj,
      });
      return;
    }

    if (password1.length < 6) {
      errObj.password2 = makeFirstCapital(strings.passwordValidationText);

      setRegister({
        ...register,
        error: errObj,
      });
      return;
    }

    signUp(
      {
        name,
        email,
        password1,
        password2,
      },
      () => {
        setRegister({
          data: initialRegisterData,
          error: errObj,
          focused: initialRegisterFocus,
        });
        alert.success(strings.signedUpSuccessfully);
      },
      (status, err) => {
        if (status === 429) {
          alert.error(`${strings.tooManyRequestsTryLater}`);

          return;
        }
        const { email: emailErr } = err.errors;
        if (emailErr && emailErr[0]) {
          errObj.email = makeFirstCapital(emailErr[0]);
          alert.error(`${emailErr[0]}`);

          setRegister({
            ...register,
            error: errObj,
          });
          return;
        }
        alert.error(`${err}`);
      }
    );
  };

  const onLoginChange = ({ target }) => {
    setLogin({
      ...login,
      data: {
        ...login.data,
        [target.name]: target.value,
      },
    });
  };

  const rememberMeChange = () =>
    setLogin({
      ...login,
      data: {
        ...login.data,
        remember_me: !login.data.remember_me,
      },
    });

  const onLoginSubmit = () => {
    const { email, password, remember_me } = login.data;

    let errObj = { ...initialLoginErr };

    if (!email || !password) {
      if (!email) {
        errObj.email = makeFirstCapital(strings.fillField);
      }
      if (!password) {
        errObj.password = makeFirstCapital(strings.fillField);
      }

      setLogin({
        ...login,
        error: errObj,
      });
      return;
    }

    logIn(
      {
        email,
        password,
        remember_me,
      },
      () => {
        setLogin({
          data: initialLoginData,
          error: errObj,
          focused: initialLoginFocus,
        });
        alert.success(strings.loggedInSuccessfully);
      },
      (status, err) => {
        if (status === 429) {
          alert.error(`${strings.tooManyRequestsTryLater}`);

          return;
        }
        if (status === 401) {
          errObj.email = true;
          errObj.password = true;
          setLogin({
            ...login,
            error: errObj,
          });
          alert.error(`${strings.emailOrPasswordIncorrect}`);

          return;
        }
        alert.error(`${err}`);
      }
    );
  };

  const onKeyPress = (e, type) => {
    if (e.which !== 13) {
      return;
    }

    if (type === "phone") {
      if (phone.data.length < 16) {
        setPhone({
          ...phone,
          error: makeFirstCapital(strings.enterPhoneCorrectly),
        });
        return;
      }

      onPhoneSubmit();
      return;
    }

    if (type === "register") {
      if (register.focused.name) {
        setRegister({
          ...register,
          focused: { ...initialRegisterFocus, email: true },
        });
        return;
      }

      if (register.focused.email) {
        setRegister({
          ...register,
          focused: { ...initialRegisterFocus, password1: true },
        });
        return;
      }

      if (register.focused.password1) {
        setRegister({
          ...register,
          focused: { ...initialRegisterFocus, password2: true },
        });
        return;
      }

      onRegisterSubmit();
      return;
    }

    if (type === "login") {
      if (login.focused.email) {
        setLogin({
          ...login,
          focused: { ...initialLoginFocus, password: true },
        });

        return;
      }

      onLoginSubmit();
      return;
    }
  };

  const onChangeSwitch = (index) => {
    let arr = [...filterValues];
    arr[index].value = !arr[index].value;
    setFilterValues([...arr]);
  };

  const onChangeCheckbox = (i, ii) => {
    let arr = [...filterValues];
    arr[i].box.items.data[ii].value = !arr[i].box.items.data[ii].value;
    setFilterValues([...arr]);
  };

  const onShowFilterBox = (index, value) => {
    let arr = [...filterValues];
    arr[index].box.show = value;
    setFilterValues([...arr]);
  };

  const onShowMoreOrHide = (index) => {
    let arr = [...filterValues];
    arr[index].box.items.show.value = !arr[index].box.items.show.value;
    setFilterValues([...arr]);
  };

  return (
    <>
      {openedModal === 1 ? (
        <DefaultModal closeBtn onClose={() => handleModal(0)}>
          <h2 className="text-customDarkBlue text-xl text-center font-extrabold mt-2">
            {makeFirstCapital(strings.loginOrRegisterToContinue)}
          </h2>

          <div
            className="relative mt-5"
            onClick={() => setPhone({ ...phone, focused: true })}
          >
            <DefaultInput
              name={"phone"}
              maxLength={16}
              value={phone.data}
              error={phone.error}
              focused={phone.focused}
              onChange={onPhoneChange}
              onKeyPress={(e) => onKeyPress(e, "phone")}
              onBlur={() => setPhone({ ...phone, focused: false })}
              onFocus={() => setPhone({ ...phone, focused: true })}
            />

            <span
              onClick={() => setPhone({ ...phone, focused: true })}
              className="absolute left-2 text-sm text-gray-400"
            >
              {makeFirstCapital(strings.phone)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {phone.error}
            </p>
          </div>

          <div className="mt-5 flex justify-center">
            <p
              onClick={() => handleModal(4)}
              className="text-sm cursor-pointer text-customBlue1 text-customBlue2-hover"
            >
              {makeFirstCapital(strings.loginByEmail)}
            </p>
          </div>

          <div className="mt-5" />
          <DefaultButton
            // loading={loading}
            textColor={"white"}
            paddingSize={"py-3"}
            bgColor={"blue-500"}
            onClick={onPhoneSubmit}
            disabled={phone.data.length < 16}
            text={makeFirstCapital(strings.toGetTheCode)}
          />
        </DefaultModal>
      ) : null}
      {openedModal === 2 ? (
        <DefaultModal closeBtn onClose={() => handleModal(0)}>
          <h2 className="text-customDarkBlue text-xl text-center font-extrabold mt-2">
            {makeFirstCapital(strings.enterCode)}
          </h2>

          <div className="mt-5 text-customDarkBlue text-sm">
            <p>{makeFirstCapital(strings.weSentConfirmationCodeToNumber)}</p>
            <div className="flex">
              <p>{phone.data}</p>
              <p
                onClick={() => handleModal(1)}
                className="ml-2 text-customBlue1 cursor-pointer"
              >
                {makeFirstCapital(strings.change)}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <OtpInput
              value={otp.data}
              onChange={(data) => setOtp({ ...otp, data })}
            />
            <p className="text-xs text-center mt-2 text-red-500">
              {!!authError && makeFirstCapital(authError)}
            </p>
          </div>

          <div className="mt-10" />
          <DefaultButton
            loading={authLoading}
            textColor={"white"}
            paddingSize={"py-3"}
            bgColor={"blue-500"}
            onClick={onOtpSubmit}
            disabled={otp.data.length !== 4}
            text={makeFirstCapital(strings.login)}
          />
        </DefaultModal>
      ) : null}
      {openedModal === 3 ? (
        <DefaultModal closeBtn onClose={() => handleModal(0)}>
          <h2 className="font-bold text-lg text-center text-customDarkBlue">
            {makeFirstCapital(strings.registration)}
          </h2>

          <div className="relative mt-5">
            <DefaultInput
              name={"name"}
              value={register.data.name}
              error={register.error.name}
              onChange={onRegisterChange}
              focused={register.focused.name}
              onKeyPress={(e) => onKeyPress(e, "register")}
              onBlur={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, name: false },
                })
              }
              onFocus={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, name: true },
                })
              }
            />

            <span className="absolute left-2 text-sm text-gray-400">
              {makeFirstCapital(strings.name)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {register.error.name}
            </p>
          </div>
          <div className="relative mt-5">
            <DefaultInput
              name={"email"}
              inputType="email"
              onChange={onRegisterChange}
              value={register.data.email}
              error={register.error.email}
              focused={register.focused.email}
              onKeyPress={(e) => onKeyPress(e, "register")}
              onBlur={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, email: false },
                })
              }
              onFocus={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, email: true },
                })
              }
            />

            <span className="absolute left-2 text-sm text-gray-400">
              {makeFirstCapital(strings.email)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {register.error.email}
            </p>
          </div>
          <div className="relative mt-5">
            <DefaultInput
              name={"password1"}
              inputType="password"
              onChange={onRegisterChange}
              value={register.data.password1}
              error={register.error.password1}
              focused={register.focused.password1}
              onKeyPress={(e) => onKeyPress(e, "register")}
              onBlur={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, password1: false },
                })
              }
              onFocus={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, password1: true },
                })
              }
            />

            <span className="absolute left-2 text-sm text-gray-400">
              {makeFirstCapital(strings.password)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {register.error.password1}
            </p>
          </div>
          <div className="relative mt-5">
            <DefaultInput
              name={"password2"}
              inputType="password"
              onChange={onRegisterChange}
              error={register.error.password2}
              value={register.data.password2}
              focused={register.focused.password2}
              onKeyPress={(e) => onKeyPress(e, "register")}
              onBlur={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, password2: false },
                })
              }
              onFocus={() =>
                setRegister({
                  ...register,
                  focused: { ...initialRegisterFocus, password2: true },
                })
              }
            />

            <span className="absolute left-2 text-sm text-gray-400">
              {makeFirstCapital(strings.password_confirmation)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {register.error.password2}
            </p>
          </div>

          <div className="mt-5 mb-2 text-sm text-center">
            {makeFirstCapital(strings.alreadyHaveAnAccount)}
            <span
              onClick={() => handleModal(4)}
              className="ml-2 text-blue-500 font-bold cursor-pointer"
            >
              {makeFirstCapital(strings.login)}
            </span>
          </div>

          <div className="mt-5" />
          <DefaultButton
            onClick={onRegisterSubmit}
            loading={authLoading}
            textColor={"white"}
            paddingSize={"py-3"}
            bgColor={"blue-500"}
            text={makeFirstCapital(strings.register)}
          />
        </DefaultModal>
      ) : null}
      {openedModal === 4 ? (
        <DefaultModal closeBtn onClose={() => handleModal(0)}>
          <h2 className="font-bold text-lg text-center text-customDarkBlue">
            {makeFirstCapital(strings.loginProfile)}
          </h2>

          <div className="relative mt-5">
            <DefaultInput
              name={"email"}
              inputType="email"
              onChange={onLoginChange}
              value={login.data.email}
              error={login.error.email}
              focused={login.focused.email}
              onKeyPress={(e) => onKeyPress(e, "login")}
              onBlur={() =>
                setLogin({
                  ...login,
                  focused: { ...initialLoginFocus, email: false },
                })
              }
              onFocus={() =>
                setLogin({
                  ...login,
                  focused: { ...initialLoginFocus, email: true },
                })
              }
            />

            <span className="absolute left-2 text-sm text-gray-400">
              {makeFirstCapital(strings.email)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {login.error.email}
            </p>
          </div>
          <div className="relative mt-5">
            <DefaultInput
              name={"password"}
              inputType="password"
              onChange={onLoginChange}
              value={login.data.password}
              error={login.error.password}
              focused={login.focused.password}
              onKeyPress={(e) => onKeyPress(e, "login")}
              onBlur={() =>
                setLogin({
                  ...login,
                  focused: { ...initialLoginFocus, password: false },
                })
              }
              onFocus={() =>
                setLogin({
                  ...login,
                  focused: { ...initialLoginFocus, password: true },
                })
              }
            />

            <span className="absolute left-2 text-sm text-gray-400">
              {makeFirstCapital(strings.password)}
            </span>
            <p className="text-xs text-center mt-2 text-red-500">
              {login.error.password}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-center">
            <Checkbox
              nativeControlId="my-checkbox"
              onChange={rememberMeChange}
              checked={login.data.remember_me}
            />
            <label
              htmlFor="my-checkbox"
              onChange={rememberMeChange}
              className="cursor-pointer"
            >
              {makeFirstCapital(strings.rememberMe)}
            </label>
          </div>

          <div className="mt-5 flex justify-center">
            <p
              onClick={() => handleModal(1)}
              className="text-sm cursor-pointer text-customBlue1 text-customBlue2-hover"
            >
              {makeFirstCapital(strings.loginByPhone)}
            </p>
          </div>

          <div className="mt-5 mb-2 text-sm text-center">
            {makeFirstCapital(strings.doYouHaveAnAccount)}
            <span
              onClick={() => handleModal(3)}
              className="ml-2 text-blue-500 font-bold cursor-pointer"
            >
              {makeFirstCapital(strings.register)}
            </span>
          </div>

          {/* <div className="text-sm text-blue-500 font-bold text-center cursor-pointer">
              Forgot password
            </div> */}

          <div className="mt-5" />
          <DefaultButton
            onClick={onLoginSubmit}
            loading={authLoading}
            textColor={"white"}
            paddingSize={"py-3"}
            bgColor={"blue-500"}
            text={makeFirstCapital(strings.login)}
          />
        </DefaultModal>
      ) : null}

      {openedModal === 6 ? (
        <div className="fixed z-20 left-0 top-0 h-screen w-screen overflow-y-scroll bg-white">
          <div className={`fixed ${sm ? "right-4 top-2" : "right-8 top-4"}`}>
            <BsX
              size={sm ? 24 : 30}
              style={{ cursor: "pointer" }}
              onClick={() => handleModal(0)}
            />
          </div>
          <div
            className={`${mini ? "m-8 mt-6" : sm ? "m-12 mt-8" : "m-20 mt-12"}`}
          >
            <div
              className={`flex ${sm ? "flex-col" : ""} justify-between ${
                !sm ? "items-center" : ""
              }`}
            >
              <p className="font-extrabold text-xl text-customDarkBlue">
                {"Все фильтры"}
              </p>
              <div
                className={`flex justify-between items-center ${
                  sm ? "mt-5" : ""
                }`}
              >
                <DefaultButton
                  disableHover
                  bgColor="customGrey"
                  textColor="customBlue1"
                  text={makeFirstCapital("очистить")}
                  textSize={mini ? "text-sm" : undefined}
                  paddingSize={mini ? "px-4 py-2" : "px-6 py-2"}
                />
                <div className="mr-5" />
                <DefaultButton
                  text={makeFirstCapital("применить")}
                  textSize={mini ? "text-sm" : undefined}
                  paddingSize={mini ? "px-4 py-2" : "px-6 py-2"}
                />
              </div>
            </div>
            {splitArr(initialFilterValues, md ? 1 : lg ? 2 : 3).map((e, i) => (
              <div
                key={i}
                className={`flex items-start justify-${
                  md ? "center" : "between"
                } mt-5`}
              >
                {e.map((ee, ii) =>
                  ee ? (
                    <>
                      {ee.box && ee.box.show ? (
                        <div
                          key={`${i}/${ii}`}
                          className="flex flex-col"
                          style={{ width: `${md ? 100 : lg ? 45 : 30}%` }}
                        >
                          <div
                            className="flex justify-between items-center py-2 border-b border-gray-200 cursor-pointer"
                            onClick={() =>
                              onShowFilterBox(
                                (md ? 1 : lg ? 2 : 3) * i + ii,
                                false
                              )
                            }
                          >
                            <p className="text-customDarkBlue font-extrabold text-lg">
                              {ee.title}
                            </p>
                            <p>
                              <TiArrowSortedUp size={20} />
                            </p>
                          </div>
                          <div>
                            {!ee.box.items.show ? (
                              ee.box.items.data.map((eee, iii) => (
                                <div
                                  key={`${i}/${ii}/${iii}`}
                                  onClick={() =>
                                    onChangeCheckbox(
                                      (md ? 1 : lg ? 2 : 3) * i + ii,
                                      iii
                                    )
                                  }
                                  className="mt-2 flex items-center cursor-pointer"
                                >
                                  <Checkbox
                                    checked={eee.value}
                                    onChange={() =>
                                      onChangeCheckbox(
                                        (md ? 1 : lg ? 2 : 3) * i + ii,
                                        iii
                                      )
                                    }
                                    nativeControlId={`my-checkbox-${i}-${ii}-${iii}`}
                                  />
                                  <label
                                    htmlFor={`my-checkbox-${i}-${ii}-${iii}`}
                                    onChange={() =>
                                      onChangeCheckbox(
                                        (md ? 1 : lg ? 2 : 3) * i + ii,
                                        iii
                                      )
                                    }
                                  >
                                    {eee.title}
                                  </label>
                                </div>
                              ))
                            ) : (
                              <>
                                {ee.box.items.show.value ? (
                                  <div className="h-96 mt-2 overflow-y-auto">
                                    {ee.box.items.data.map((eee, iii) => (
                                      <div
                                        key={`${i}/${ii}/${iii}`}
                                        onClick={() =>
                                          onChangeCheckbox(
                                            (md ? 1 : lg ? 2 : 3) * i + ii,
                                            iii
                                          )
                                        }
                                        className="mt-2 flex items-center cursor-pointer"
                                      >
                                        <Checkbox
                                          checked={eee.value}
                                          onChange={() =>
                                            onChangeCheckbox(
                                              (md ? 1 : lg ? 2 : 3) * i + ii,
                                              iii
                                            )
                                          }
                                          nativeControlId={`my-checkbox-${i}-${ii}-${iii}`}
                                        />
                                        <label
                                          htmlFor={`my-checkbox-${i}-${ii}-${iii}`}
                                          onChange={() =>
                                            onChangeCheckbox(
                                              (md ? 1 : lg ? 2 : 3) * i + ii,
                                              iii
                                            )
                                          }
                                        >
                                          {eee.title}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div>
                                    {ee.box.items.data
                                      .slice(0, 5)
                                      .map((eee, iii) => (
                                        <div
                                          key={`${i}/${ii}/${iii}`}
                                          onClick={() =>
                                            onChangeCheckbox(
                                              (md ? 1 : lg ? 2 : 3) * i + ii,
                                              iii
                                            )
                                          }
                                          className="mt-2 flex items-center cursor-pointer"
                                        >
                                          <Checkbox
                                            checked={eee.value}
                                            onChange={() =>
                                              onChangeCheckbox(
                                                (md ? 1 : lg ? 2 : 3) * i + ii,
                                                iii
                                              )
                                            }
                                            nativeControlId={`my-checkbox-${i}-${ii}-${iii}`}
                                          />
                                          <label
                                            htmlFor={`my-checkbox-${i}-${ii}-${iii}`}
                                            onChange={() =>
                                              onChangeCheckbox(
                                                (md ? 1 : lg ? 2 : 3) * i + ii,
                                                iii
                                              )
                                            }
                                          >
                                            {eee.title}
                                          </label>
                                        </div>
                                      ))}
                                  </div>
                                )}
                                <div
                                  onClick={() => onShowMoreOrHide(ii)}
                                  className="mt-2 text-customBlue1 cursor-pointer"
                                >
                                  {ee.box.items.show.value
                                    ? makeFirstCapital("hide")
                                    : makeFirstCapital("show more")}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={`${i}/${ii}`}
                          onClick={
                            ee.box
                              ? () =>
                                  onShowFilterBox(
                                    (md ? 1 : lg ? 2 : 3) * i + ii,
                                    true
                                  )
                              : () =>
                                  onChangeSwitch((md ? 1 : lg ? 2 : 3) * i + ii)
                          }
                          className="flex justify-between items-center py-2 border-b border-gray-200 cursor-pointer"
                          style={{ width: `${md ? 100 : lg ? 45 : 30}%` }}
                        >
                          <p className="text-customDarkBlue font-extrabold text-lg">
                            {ee.title}
                          </p>
                          <p>
                            {ee.box ? (
                              <TiArrowSortedDown
                                size={20}
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  onShowFilterBox(
                                    (md ? 1 : lg ? 2 : 3) * i + ii,
                                    true
                                  )
                                }
                              />
                            ) : (
                              <Switch
                                width={42}
                                height={26}
                                checkedIcon={""}
                                onColor="#0457D6"
                                uncheckedIcon={""}
                                offColor="#E3E6EA"
                                checked={ee.value}
                                onChange={() =>
                                  onChangeSwitch((md ? 1 : lg ? 2 : 3) * i + ii)
                                }
                              />
                            )}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        width: `${md ? 100 : lg ? 45 : 30}%`,
                        visibility: !ee ? "hidden" : "unset",
                      }}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  openedModal: selectUserOpenedModal,
  authLoading: selectUserAuthLoading,
  authError: selectUserAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  handleModal: (value) => dispatch(handleModal(value)),
  signInEnterPhone: (payload) => dispatch(signInEnterPhone(payload)),
  signInEnterOtp: (payload, cb) => dispatch(signInEnterOtp(payload, cb)),
  signUp: (payload, cb, errorCb) => dispatch(signUp(payload, cb, errorCb)),
  logIn: (payload, cb, errorCb) => dispatch(logIn(payload, cb, errorCb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
