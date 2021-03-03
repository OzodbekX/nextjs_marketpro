import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import DefaultModal from "../../../components/common/DefaultModal";
import {
  selectUserAccessToken,
  selectUserAddresses,
  selectUserLanguage,
} from "../../../redux/selectors/user";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { GoPlus } from "react-icons/go";
import { strings } from "../../../locales/strings";
import {
  addUserAddressStart,
  removeUserAddressStart,
} from "../../../redux/modules/user/action";
import { AiFillDelete } from "react-icons/ai";
import { makeFirstCapital } from "../../../utils";

const UserAddressesPage = ({
  addresses,
  addUserAddressStart,
  token,
  language,
  removeUserAddressStart,
}) => {
  const md = useMediaQuery(768);
  const [open, setOpen] = useState(false);

  const [addressCredentials, setAddressCredentials] = useState({
    address: "",
    postal_code: "",
    city: "",
    country: "",
    phone: "",
    set_default: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = () => {
    const {
      address,
      postal_code,
      city,
      country,
      phone,
      set_default,
    } = addressCredentials;

    if (!(address && postal_code && city && country && phone)) {
      setError("Please Fill All Gaps");
      return;
    }

    setError("");
    addUserAddressStart(
      {
        address,
        postal_code,
        city,
        country,
        phone,
        set_default: set_default ? 1 : 0,
      },
      token
    );

    setOpen(false);
  };

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div>
      <div
        className={`flex flex-col m-auto justify-start w-5/6 ${
          !md ? "px-8" : ""
        } mb-4`}
      >
        <div className={"font-bold text-base ml-4"}>
          {strings.note.toUpperCase()}
        </div>
        <div className={"flex flex-row ml-4 items-center mt-1"}>
          <div className={"h-3 w-3 border-2 rounded border-customBlue1 mx-2"} />
          <div>{makeFirstCapital(strings.meansDefaultAddress)}</div>
        </div>
      </div>
      <div
        className={`flex w-5/6 flex-wrap items-center ${
          !md ? "px-8" : ""
        } justify-start m-auto`}
      >
        {addresses &&
          addresses.map(
            ({
              id,
              address,
              city,
              postal_code,
              country,
              phone,
              set_default,
            }) => (
              <div
                data-id={id}
                className={`rounded h-36 border-2 border-gray-300 flex p-2 w-72 m-4 cursor-pointer transition duration-500 ease-in-out ${
                  set_default && "border-customBlue1"
                }`}
              >
                <div onClick={() => removeUserAddressStart(id, token)}>
                  <AiFillDelete color={"#f00"} />
                </div>
                <div className={`${!md ? "ml-6" : "ml-2"}`}>
                  <div>
                    <h1 className="text-sm text-gray-500">
                      {`${makeFirstCapital(strings.address)}: `}
                      <span className="font-bold text-gray-700">{address}</span>
                    </h1>
                    <h1 className="text-sm text-gray-500">
                      {`${makeFirstCapital(strings.postalCode)}: `}
                      <span className="font-bold text-gray-700">
                        {postal_code}
                      </span>
                    </h1>
                    <h1 className="text-sm text-gray-500">
                      {`${makeFirstCapital(strings.city)}: `}
                      <span className="font-bold text-gray-700">{city}</span>
                    </h1>
                    <h1 className="text-sm text-gray-500">
                      {`${makeFirstCapital(strings.country)}: `}
                      <span className="font-bold text-gray-700">{country}</span>
                    </h1>
                    <h1 className="text-sm text-gray-500">
                      {`${makeFirstCapital(strings.phone)}: `}
                      <span className="font-bold text-gray-700">{phone}</span>
                    </h1>
                  </div>
                </div>
              </div>
            )
          )}
        <div
          onClick={() => setOpen(true)}
          className={`h-36 rounded border-2 border-gray-300 flex items-center justify-center p-2 w-72 m-4 cursor-pointer transition duration-500 ease-in-out `}
        >
          <div className="py-10 text-3xl">
            <GoPlus />
          </div>
        </div>
        {open && (
          <DefaultModal closeBtn onClose={() => setOpen(false)}>
            <div className=" ">
              <form className=" flex justify-between p-4">
                <label className="mr-2">
                  {makeFirstCapital(strings.address)}:{" "}
                </label>
                <input
                  data-key={"address"}
                  onChange={(event) => {
                    setAddressCredentials({
                      ...addressCredentials,
                      [event.currentTarget.getAttribute("data-key")]: event
                        .currentTarget.value,
                    });
                  }}
                  placeholder={makeFirstCapital(strings.address)}
                  className="p-2 outline-none border border-gray-300 "
                  type="text"
                />
              </form>
              <form className=" flex justify-between p-4">
                <label className="mr-2">{strings.moduleCountry}: </label>
                <input
                  data-key={"country"}
                  onChange={(event) => {
                    setAddressCredentials({
                      ...addressCredentials,
                      [event.currentTarget.getAttribute("data-key")]: event
                        .currentTarget.value,
                    });
                  }}
                  placeholder={strings.moduleCountry}
                  className="p-2 outline-none border border-gray-300 "
                  type="text"
                />
              </form>
              <form className=" flex justify-between p-4">
                <label className="mr-2">{strings.moduleCity}: </label>
                <input
                  data-key={"city"}
                  onChange={(event) => {
                    setAddressCredentials({
                      ...addressCredentials,
                      [event.currentTarget.getAttribute("data-key")]: event
                        .currentTarget.value,
                    });
                  }}
                  placeholder={strings.moduleCity}
                  className="p-2 outline-none border border-gray-300 "
                  type="text"
                />
              </form>
              <form className=" flex justify-between p-4">
                <label className="mr-2">{strings.moduleZipCode}: </label>
                <input
                  data-key={"postal_code"}
                  onChange={(event) => {
                    setAddressCredentials({
                      ...addressCredentials,
                      [event.currentTarget.getAttribute("data-key")]: event
                        .currentTarget.value,
                    });
                  }}
                  placeholder={strings.moduleZipCode}
                  className="p-2 outline-none border border-gray-300 "
                  type="text"
                />
              </form>
              <form className=" flex justify-between p-4">
                <label className="mr-2">{strings.modulePhone}: </label>
                <input
                  data-key={"phone"}
                  onChange={(event) => {
                    setAddressCredentials({
                      ...addressCredentials,
                      [event.currentTarget.getAttribute("data-key")]: event
                        .currentTarget.value,
                    });
                  }}
                  placeholder={strings.modulePhone}
                  className="p-2 outline-none border border-gray-300 "
                  type="Тел"
                />
              </form>
              <div
                className={
                  "flex flex-row justify-center mt-1 mb-4 items-center"
                }
                onClick={() => {
                  setAddressCredentials({
                    ...addressCredentials,
                    set_default: !addressCredentials.set_default,
                  });
                }}
              >
                <input
                  type={"checkbox"}
                  checked={addressCredentials.set_default}
                />
                <label className={"ml-2"}>
                  {makeFirstCapital(strings.showAddressAsDefault)}
                </label>
              </div>
              {error && <p>{error}</p>}
              <button
                onClick={handleSubmit}
                className="w-full bg-customBlue1 bg-customBlue2-hover focus:outline-none py-2 rounded text-white"
              >
                {strings.save}
              </button>
            </div>
          </DefaultModal>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  addresses: selectUserAddresses,
  token: selectUserAccessToken,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  addUserAddressStart: (address, token) =>
    dispatch(addUserAddressStart(address, token)),
  removeUserAddressStart: (addressId, token) =>
    dispatch(removeUserAddressStart(addressId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressesPage);
