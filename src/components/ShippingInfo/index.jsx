import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { createStructuredSelector } from "reselect";
import DefaultModal from "../common/DefaultModal";
import {
  selectUserAddresses,
  selectUserAccessToken,
  selectUserLanguage,
} from "../../redux/selectors/user";
import { useRouter } from "next/router";
import {
  setSelectedDeliveryInfo,
  addUserAddressStart,
} from "../../redux/modules/user/action";
import { strings } from "../../locales/strings";
import { GoPlus } from "react-icons/go";
import { makeFirstCapital } from "../../utils";

const ShippingInfo = ({
  setShipInfo,
  setDeliveryInfo,
  addresses,
  setSelectedDeliveryInfo,
  addUserAddressStart,
  token,
  language,
}) => {
  const [selected, setSelected] = useState(null);

  const [error, setError] = useState("");

  const [addressCredentials, setAddressCredentials] = useState({
    address: "",
    postal_code: "",
    city: "",
    country: "",
    phone: "",
    set_default: false,
  });

  const md = useMediaQuery(768);
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
    <div
      className={`${!md ? "my-10 p-10" : ""} bg-gray-100 rounded  w-3/4 m-auto`}
    >
      <div
        className={`flex  flex-wrap items-center ${
          !md ? "px-8" : ""
        } justify-between m-auto`}
      >
        {addresses &&
          addresses.map(
            ({ id, address, city, postal_code, country, phone }) => (
              <div
                data-id={id}
                className={`rounded ${
                  id === selected
                    ? "border-2 border-red-400"
                    : "border-2 border-gray-300"
                } flex  p-2 w-72 m-4 cursor-pointer transition duration-500 ease-in-out`}
                onClick={(e) => {
                  setSelectedDeliveryInfo({ addressId: id });
                  setSelected(+e.currentTarget.getAttribute("data-id"));
                }}
              >
                <input
                  type="checkbox"
                  checked={id === selected}
                  className="mt-2 "
                />
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
                <label className="mr-2">{strings.address}: </label>
                <input
                  data-key={"address"}
                  onChange={(event) => {
                    setAddressCredentials({
                      ...addressCredentials,
                      [event.currentTarget.getAttribute("data-key")]: event
                        .currentTarget.value,
                    });
                  }}
                  placeholder={strings.address}
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
      <div className="flex w-5/6 justify-around mt-10 m-auto">
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 font-semibold"
        >
          &#8592; {makeFirstCapital(strings.backToShop)}
        </button>
        <button
          onClick={() => {
            if (selected) {
              setShipInfo(false);
              setDeliveryInfo(true);
            }
          }}
          className={`${
            !selected && "opacity-25 cursor-default"
          } bg-blue-700 ml-4 p-2 text-white font-bold rounded hover:bg-blue-800 focus:outline-none`}
        >
          {makeFirstCapital(strings.continueToDeliveryInfo)}
        </button>
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
  setSelectedDeliveryInfo: (data) => dispatch(setSelectedDeliveryInfo(data)),
  addUserAddressStart: (address, token) =>
    dispatch(addUserAddressStart(address, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInfo);
