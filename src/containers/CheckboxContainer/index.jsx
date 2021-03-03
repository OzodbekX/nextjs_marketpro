import Checkbox from "../../components/Checkbox";

const CheckboxContainer = ({ items }) => {
  return (
    <>
      {items.length
        ? items.map((item) =>
            item.attr ? (
              <div>
                {item.attr.name && (
                  <p className="font-bold mb-2">{item.attr.name}</p>
                )}
                {item.values.map((value) => (
                  <Checkbox id={item.attr.id} title={value} />
                ))}
              </div>
            ) : (
              ""
            )
          )
        : ""}
    </>
  );
};

export default CheckboxContainer;
