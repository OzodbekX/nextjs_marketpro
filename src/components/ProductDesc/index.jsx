import React from "react";
import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";

const ProductDesc = ({ product }) => {
  return (
    <div className="mt-12 w-full xl:w-3/4" style={{ color: "#001a34" }}>
      {product.characteristics && (
        <div className={"mt-12"}>
          <h1 className={"font-bold mb-4 text-2xl"}>
            {makeFirstCapital(strings.characteristics)}
          </h1>
          <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            {product.characteristics.parents.map((parent, index) => (
              <div
                className={`flex flex-col mt-5 ${
                  index % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                }`}
              >
                <h1 className={"font-bold"}>{parent.name}</h1>
                <div className={"flex flex-col mt-2"}>
                  {product.characteristics.attrs.map(
                    (attr) =>
                      attr.parent_id === parent.id && (
                        <div
                          className={
                            "relative flex flex-row justify-between text-sm mt-2"
                          }
                        >
                          <div
                            style={{ zIndex: -1 }}
                            className="absolute top-0 bottom-0 left-0 right-0 border-b-2 border-dotted"
                          />
                          <p
                            style={{ color: "#808d9a" }}
                            className="border-b-2 border-white border-solid"
                          >
                            {attr.key}
                          </p>
                          <p
                            style={{ color: "#001a34" }}
                            className="border-b-2 border-white border-solid w-1/2 text-right"
                          >
                            {attr.value}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDesc;
