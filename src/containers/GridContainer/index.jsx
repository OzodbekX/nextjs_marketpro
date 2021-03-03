import React from "react";

const GridContainer = ({
  sizes,
  children,
  gapSize,
  alignItems,
  padding,
  justifyItems,
}) => {
  let string = sizes.join("fr ");
  string += "fr";

  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: string,
        gridGap: gapSize,
        alignItems,
        padding,
        justifyItems,
      }}
    >
      {children}
    </div>
  );
};

export default GridContainer;
