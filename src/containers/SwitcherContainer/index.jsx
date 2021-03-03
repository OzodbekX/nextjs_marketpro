import React from "react";
import Switcher from "../../components/Switcher";

const SwitcherContainer = ({ switchers,className }) => {
  return (
    <div className={className}>
      {switchers.map((switcher) => (
        <Switcher {...switcher} />
      ))}
    </div>
  );
};

export default SwitcherContainer;
