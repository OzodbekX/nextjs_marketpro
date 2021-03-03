import { AiOutlineClose, AiOutlineFileSearch } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { connect } from "react-redux";
import { makeFirstCapital } from "../../utils";
import { strings } from "../../locales/strings";
import { createStructuredSelector } from "reselect";
import { selectCategories } from "../../redux/selectors/product";

const SearchFilter = ({ categories, setFilterModal, setSelectedCategory }) => {
  return (
    <div
      className="
            fixed top-0 left-0 z-50
            bg-black bg-opacity-50
            z-40
            w-screen h-screen
            flex flex-row justify-around items-start"
    >
      {/* modal */}
      <div
        className="
                relative
                overflow-y-auto
                bg-white h-screen lg:h-auto w-/12 lg:w-6/12 xl:w-5/12
                lg:mt-16 px-10 py-8
                flex flex-wrap"
      >
        {/* close-icon */}
        <div
          onClick={() => setFilterModal(false)}
          className="
                    absolute top-4 right-4
                    bg-gray-200 bg-opacity-0 rounded-full
                    p-1
                    cursor-pointer transition duration-400
                    hover:bg-opacity-100
                    text-xl
                    "
        >
          <AiOutlineClose />
        </div>

        {/* modal-top */}
        <div
          onClick={() => {
            setFilterModal(false);
            setSelectedCategory("");
          }}
          className="
                    w-full lg:w-1/2 rounded bg-searchFilterItBg-hover text-customBlue2-hover
                    flex items-center py-1.5 mb-6
                    text-customDarkBlue text-sm cursor-pointer"
        >
          <div className="px-1.5 text-xl text-customBlue2">
            <AiOutlineFileSearch />
          </div>
          {makeFirstCapital(strings.everywhere)}
        </div>
        <div className="w-1/2" />

        {/* modal-items */}
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              setFilterModal(false);
              setSelectedCategory(category);
            }}
            className="
                        w-full lg:w-1/2 rounded bg-searchFilterItBg-hover text-customBlue2-hover
                        flex items-center py-1.5
                        text-customDarkBlue text-sm cursor-pointer"
          >
            <div className="px-1.5 text-xl text-customBlue2">
              <BsCircle />
            </div>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
});

export default connect(mapStateToProps)(SearchFilter);
