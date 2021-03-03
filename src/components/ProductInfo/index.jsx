import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSelectedProductVariant } from "../../redux/modules/product/actions";
import { base_url } from "../../constants";
import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";

const ProductInfo = ({ product, setSelectedVariant }) => {
  const [selectedChoiceOptions, setSelectedChoiceOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const defaultChoiceOption = [];
    if (product.choice_options) {
      product.choice_options.map((option) =>
        defaultChoiceOption.push(`${option.name}-${option.options[0]}`)
      );

      if (product.colors.length) {
        setSelectedColor(product.colors[0].name);
      }
      setSelectedChoiceOptions(defaultChoiceOption);
      setSelectedVariant(product.variations[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedChoiceOptions && product.variations) {
      const selectedOptionValues = [];
      selectedChoiceOptions.map((option) =>
        selectedOptionValues.push(option.split("-")[1])
      );

      if (selectedColor) {
        selectedOptionValues.push(selectedColor);
      }

      product.variations.map((option) => {
        if (option.variant) {
          let optionSkuArray = [];
          if (option.variant.includes("-")) {
            optionSkuArray = option.variant.split("-");
          } else {
            optionSkuArray[0] = option.variant;
          }

          const booleans = [];
          selectedOptionValues.map((opt) => {
            booleans.push(
              optionSkuArray.includes(
                opt && opt.includes(" ") ? opt.split(" ").join("") : opt
              )
            );
          });

          if (!booleans.includes(false) && option) {
            setSelectedVariant(option);
          }
        }
      });
    }
  }, [selectedChoiceOptions, selectedColor]);

  return (
    <div className="py-4 px-2 h-full">
      <div
        style={{ fontSize: "13px" }}
        className="h-full flex flex-col justify-between md:px-8"
      >
        <div className="flex my-4 flex-col">
          {product.choice_options &&
            product.choice_options.map((option, index) => (
              <div key={index}>
                <div className={"mb-2 text-sm"} style={{ color: "#808d9a" }}>
                  {option.title}
                </div>
                <div className={"flex flex-row"}>
                  {option.options.map((opt, index) => (
                    <div
                      onClick={() => {
                        const hasOption = selectedChoiceOptions.find(
                          (o) => o.split("-")[0] === option.name
                        );

                        if (hasOption) {
                          const newSelectedChoiceOptions = selectedChoiceOptions.filter(
                            (option) => option !== hasOption
                          );

                          setSelectedChoiceOptions([
                            ...newSelectedChoiceOptions,
                            `${option.name}-${opt}`,
                          ]);
                        } else {
                          setSelectedChoiceOptions([
                            ...selectedChoiceOptions,
                            `${option.name}-${opt}`,
                          ]);
                        }
                      }}
                      className={`${
                        selectedChoiceOptions.includes(`${option.name}-${opt}`)
                          ? "border-green-400"
                          : "border-gray-200"
                      } hover:border-blue-400 mx-1 border-2 text-center py-2 px-4 rounded hover-trigger cursor-pointer`}
                      key={index}
                    >
                      <p style={{ color: "#001a34" }} className={"font-medium"}>
                        {opt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {product.colors && (
            <div className={"mt-4"}>
              <div className={"mb-2"} style={{ color: "#001a34" }}>
                <span style={{ color: "#808d9a" }}>
                  {makeFirstCapital(strings.colors)}:
                </span>{" "}
                {selectedColor}
              </div>
              <div className={"flex flex-row"}>
                {product.colors.map((color) => (
                  <div className={"px-1"}>
                    <div
                      onClick={() => setSelectedColor(color.name)}
                      className={`${
                        selectedColor === color.name
                          ? "border-green-400"
                          : "border-gray-200"
                      } h-10 w-10 rounded cursor-pointer border-2 hover:border-blue-400`}
                      style={{ backgroundColor: `${color.hash}` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={"mt-5 text-sm"}>
            {product.characteristics &&
              product.characteristics.attrs.map(
                (attr, index) =>
                  index < 10 && (
                    <div
                      className={"relative flex flex-row justify-between mt-3"}
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
                        className="border-b-2 border-white border-solid"
                      >
                        {attr.value && attr.value.length > 10
                          ? `${attr.value.substr(0, 12)}...`
                          : attr.value}
                      </p>
                    </div>
                  )
              )}
          </div>
        </div>
        <div
          className={
            "font-medium text-customBlue1 cursor-pointer text-customBlue2-hover text-sm mb-4"
          }
          onClick={() =>
            document
              .getElementById("productDescription")
              .scrollIntoView({ behavior: "smooth", block: "center" })
          }
        >
          {makeFirstCapital(strings.goToDescription)}
        </div>
        {product.brand && product.brand.logo && (
          <div
            className={"flex flex-row items-center"}
            style={{ justifySelf: "end" }}
          >
            <img
              className={"w-30 h-16"}
              src={`${base_url}${product.brand.logo}`}
              alt={"Product Logo"}
            />
            <p className={"font-bold text-lg ml-2"}>{product.brand.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedVariant: (variant) => dispatch(setSelectedProductVariant(variant)),
});

export default connect(null, mapDispatchToProps)(ProductInfo);
