import { BsEyeSlashFill } from "react-icons/bs";

const Market = (props) => {
  const { name, user, logo, items } = props;

  return (
    <>
      {/* Cart */}
      <div
        className="
      bg-customLightGray bg-customGrey-hoverHover
      cursor-pointer rounded
      group
      mx-auto
      w-72 lg:w-auto p-3"
      >
        {/* cart-top */}
        <div
          className="
        grid grid-cols-5
        justify-center
        mb-4"
        >
          <img className="rounded col-span-1" src={logo} alt="" />
          <div className="col-span-4 pl-2">
            <p className="text-base font-bold">{name}</p>
          </div>
        </div>

        {/* cart-content */}
        {items && (
          <div className="row-span-3">
            <div
              className="
          grid grid-cols-3 grid-rows-2 gap-1
          h-48"
            >
              {/* cart-content-left */}
              <div
                className="
            col-span-2 row-span-2
            flex justify-center
            bg-white
            relative"
              >
                <img
                  className="object-contain"
                  src={items[0].src}
                  style={
                    items[0].isHidden ? { filter: "blur(10px)" } : undefined
                  }
                />
                <div
                  className="
                  absolute top-0 left-0 
                  w-full h-full flex 
                  justify-center items-center 
                  text-xl"
                >
                  {items[0].isHidden ? <BsEyeSlashFill /> : ""}
                </div>
                {items[0].isHidden ? (
                  ""
                ) : (
                  <div
                    className="
                      bg-black bg-opacity-70
                      group-hover:opacity-100
                      opacity-0 absolute bottom-0 left-0
                      rounded-tr rounded-bl-sm
                      text-sm font-bold text-white
                      py-0.5 pr-1 pl-2"
                  >
                    {items[0].price}
                  </div>
                )}
              </div>

              {/* cart-content-right  1*/}
              <div
                className="
              col-span-1 row-span-1
              flex justify-center
              bg-white
              relative"
              >
                <img
                  className="object-content"
                  src={items[1].src}
                  style={
                    items[1].isHidden ? { filter: "blur(10px)" } : undefined
                  }
                />
                <div
                  className="
                  absolute top-0 left-0 
                  w-full h-full flex 
                  justify-center items-center 
                  text-xl"
                >
                  {items[1].isHidden ? <BsEyeSlashFill /> : ""}
                </div>
                {items[1].isHidden ? (
                  ""
                ) : (
                  <div
                    className="
                      bg-black bg-opacity-70
                      group-hover:opacity-100
                      opacity-0 absolute bottom-0 left-0
                      rounded-tr rounded-bl-sm
                      text-sm font-bold text-white
                      py-0.5 pr-1 pl-2"
                  >
                    {items[1].price}
                  </div>
                )}
              </div>

              {/* cart-content-right 2 */}
              <div
                className="
              col-span-1 row-span-1
              flex justify-center
              bg-white
              relative"
              >
                <img
                  className="object-content"
                  src={items[2].src}
                  style={
                    items[2].isHidden ? { filter: "blur(10px)" } : undefined
                  }
                />
                <div
                  className="
                  absolute top-0 left-0 
                  w-full h-full flex 
                  justify-center items-center 
                  text-xl"
                >
                  {items[2].isHidden ? <BsEyeSlashFill /> : ""}
                </div>
                {items[2].isHidden ? (
                  ""
                ) : (
                  <div
                    className="
                      bg-black bg-opacity-70
                      group-hover:opacity-100
                      opacity-0 absolute bottom-0 left-0
                      rounded-tr rounded-bl-sm
                      text-sm font-bold text-white
                      py-0.5 pr-1 pl-2"
                  >
                    {items[2].price}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Market;
