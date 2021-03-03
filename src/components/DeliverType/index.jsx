import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { strings } from "../../locales/strings";
import { makeFirstCapital, normalizePrice } from "../../utils";
import { FiBox } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const DeliveryItem = ({ selectedVariant, product }) => {
  return (
    <div className={"h-full"}>
      <div className={"flex flex-col"}>
        <p className={"font-bold text-base"}>
          {makeFirstCapital(strings.deliveryCityMag)}
        </p>
        <p className={"text-customGreyText mt-1 text-sm"}>
          {makeFirstCapital(strings.dleiveryFromStore)}{" "}
          <strong>{makeFirstCapital(strings.cityMag)}</strong>
        </p>
      </div>
      <div className={"mt-6 text-base"}>
        <div className="flex items-start mt-2">
          <IoMdCheckmarkCircleOutline className="mr-3 text-2xl" />
          <div className="flex">
            <div>
              <span className={"text-customGreyText"}>
                {makeFirstCapital(strings.leftQuantity)}
              </span>{" "}
              -{" "}
              <span className={"font-medium text-customRed"}>
                {selectedVariant.qty} {strings.piece}
              </span>
            </div>
          </div>
        </div>
        <div className={"flex my-2"}>
          <HiOutlineShoppingBag className={"text-2xl mr-3"} />
          <p>
            <span className={"text-customGreyText"}>
              {makeFirstCapital(strings.localPickup)}
            </span>
            {" - "}{" "}
            <span className={"font-medium text-customRed"}>
              {makeFirstCapital(strings.free)}
            </span>
          </p>
        </div>
        <div className="flex my-2">
          <FiBox className="mr-3 text-2xl" />
          {product.shipping_type ? (
            <p>
              <span className={"text-customGreyText"}>
                {" "}
                {makeFirstCapital(strings.homeDelivery)}
              </span>{" "}
              -{""}
              <span className="font-medium text-customRed">
                {" "}
                {product.shipping_cost !== 0
                  ? normalizePrice(product.shipping_cost.toString())
                  : makeFirstCapital(strings.free)}{" "}
              </span>
            </p>
          ) : (
            ""
          )}
        </div>
        {/*<div className="text-base font-bold pt-8">*/}
        {/*  {seller ? "Доставит продавец" : "Доставит CityMag"}*/}
        {/*</div>*/}

        {/*<div>*/}

        {/*  <div className="flex items-start mt-2">*/}
        {/*
        {/*    <div>*/}
        {/*      <p className="text-left">*/}
        {/*        <span className="text-customBlue1 cursor-pointer">*/}
        {/*          {makeFirstCapital(strings.deliveryPoint)},*/}
        {/*        </span>*/}
        {/*        <strong className="font-bold"> {deliveryCost} </strong>*/}
        {/*      </p>*/}

        {/*      /!* fix appears = завтра, 17 января*!/*/}
        {/*      <div className="text-customGreyText w-full">*/}
        {/*        {moment(storeDate).add(0, "days").calendar()}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="flex items-start mt-2">*/}
        {/*    <RiTruckLine className="mr-3 text-2xl" />*/}
        {/*    <div>*/}
        {/*      <div>*/}
        {/*        {makeFirstCapital(strings.delivery)} {deliveryType}*/}
        {/*      </div>*/}

        {/*      /!* fix appears = завтра, 17 января*!/*/}
        {/*      <div className="text-customGreyText w-full">*/}
        {/*        {moment(deliverDate).add(0, "days").calendar()}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="flex items-start mt-2">*/}
        {/*    <MdAirplanemodeActive className="mr-3 text-2xl" />*/}
        {/*    <div>*/}
        {/*      <div>*/}
        {/*        {makeFirstCapital(strings.deliveryByMail)},{" "}*/}
        {/*        {moment(deliverDate).add(0, "days").calendar()}*/}
        {/*      </div>*/}
        {/*      <div className="text-customGreyText w-full">{deliveryCost}</div>*/}
        {/*      <Link href="/">*/}
        {/*        <a className="text-customBlue1">*/}
        {/*          {makeFirstCapital(strings.deliveryFromAbroad)}*/}
        {/*        </a>*/}
        {/*      </Link>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="col-span-3 bg-red-500" />
    </div>
  );
};

export default DeliveryItem;
