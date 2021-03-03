import React from "react";
import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";

const Specification = ({ spesifications }) => {
  return (
    <div className="  w-11/12">
      {/* <h1 className="text-2xl font-bold mb-4">
        {makeFirstCapital(strings.specifications)}
      </h1>
      {spesifications.map((item) => (
        <>
          <h1 className="my-2 font-semibold">{item.title}</h1>
          <div className="flex mb-6 flex-wrap w-full justify-between  ">
            {item.spesific.map((info) => (
              <>
                <div className="w-2/5 mb-2 flex border-b-2 border-gray-100 justify-between">
                  <h1 className="text-gray-500">{info.info}</h1>
                  <span className="text-gray-600">{info.num}</span>
                </div>
              </>
            ))}
          </div>
        </>
      ))} */}
    </div>
  );
};

export default Specification;
