import React, { useState } from "react";
import Switch from "react-switch";

const SwitchExample = ({  title,bgColor }) => {
  const [checked, setChecked] = useState();

  const handleChange = (checked) => {
    setChecked(checked);
  };
  return (
    <label
      className={`flex justify-between mb-6 ${
        bgColor ? "p-2 bg-customSwitcher" : null
      }`}
    >
      <div className="text-customDarkBlue font-bold">{title}</div>
      <Switch
        onChange={handleChange}
        checked={checked}
        offColor="#E3E6EA"
        onColor="#0457D6"
        uncheckedIcon={""}
        checkedIcon={""}
      />
    </label>
  );
};

export default SwitchExample;
