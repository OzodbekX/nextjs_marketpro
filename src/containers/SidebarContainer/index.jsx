import React from "react";
import Sidebar from "../../components/Sidebar";

const SidebarContainer = ({ items, fontSize }) => {
  return (
    <>
      <div>
        {items.map((item, index) => (
          <Sidebar {...item} key={index} index={index} fontSize={fontSize} />
        ))}
      </div>
    </>
  );
};

export default SidebarContainer;
