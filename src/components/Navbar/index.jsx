import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { VscTriangleDown } from "react-icons/vsc";
import "react-pro-sidebar/dist/css/styles.css";

const Navbar = ({ navMenus }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(null);

  const md = useMediaQuery(1000)

  return (
    // sidenavbar menu opens when width<1000
    <div className={"relative mt-5 "}>
      {md && <ProSidebar width={400} className="pro-sidebar">
        <Menu iconShape="square">
          {navMenus.map((nav) => (
            <SubMenu
              className="text-black"
              title={nav.title}
              icon={<VscTriangleDown className="text-black " />}
            >
              {nav.categories &&
                nav.categories.map((category) => (
                  <SubMenu className="text-black" title={category.title}>
                    {category.subCategory &&
                      category.subCategory.map((sub) => (
                        <MenuItem>{sub}</MenuItem>
                      ))}
                  </SubMenu>
                ))}
            </SubMenu>
          ))}
        </Menu>
      </ProSidebar>}


      {
        //  menu shown when width>1000        
        !md && <div>
        <div
          className={
            "mt-5 parent-div bg-gray-100 z-50 flex flex-row justify-around font-bold text-xs border-gray-300"
          }
        >
          {navMenus.map((menu, index) => (
            <div
              key={index}
              className={"px-9 py-4 nav-link "}
              onMouseEnter={() => {
                if (index !== 0) {
                  setCategoryIndex(index);
                  setShowCategory(true);
                }
              }}
              onMouseLeave={() => setShowCategory(false)}
            >
              <Link href={""}>
                <a className={`${index === 0 && "text-red-500"}`}>{menu.title}</a>
              </Link>
            </div>
          ))}
        </div>

        <div
          className={
            "absolute bg-gray-100 w-full z-20 flex justify-start text-sm dropdown"
          }
          onMouseEnter={() => setShowCategory(true)}
          onMouseLeave={() => {
            setShowCategory(false);
            setCategoryIndex(null);
          }}
        >
          {categoryIndex &&
            showCategory &&
            navMenus[categoryIndex].categories &&
            navMenus[categoryIndex].categories.map((category, index) => (
              <div className={"px-10"} key={index}>
                <h5 className={"py-4 font-bold"}>{category.title}</h5>
                <div className={"flex flex-col pb-5"}>
                  {category.subCategory.map((subCategory, subIndex) => (
                    <p className={"pb-1"} key={subIndex}>
                      {subCategory}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>}
      


    </div>
  );
};

export default Navbar;
