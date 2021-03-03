import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartProductsCount } from "../../redux/selectors/cart";
import {
  selectUserOrdersHistory,
  selectUserWishlist,
} from "../../redux/selectors/user";

const UserCardCount = ({ wishlist, orders, cards }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-3 sm:col-span-1 rounded-lg pb-10 md:pb-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="pt-4 md:pt-8 pl-4 md:pl-8 text-xl md:text-2xl text-white font-bold">
          {cards ? cards : 0} Product(s)
        </div>
        <div className="pl-4 md:pl-8 pt-4 md:pt-4 text-md md:text-lg text-white">
          in your cart
        </div>
      </div>
      <div className="col-span-3 sm:col-span-1 rounded-lg pb-10 md:pb-20 bg-gradient-to-r from-red-400 to-blue-500 ">
        <div className="pt-4 md:pt-8 pl-4 md:pl-8 text-xl md:text-2xl text-white font-bold">
          {wishlist ? wishlist.length : 0} Product(s)
        </div>
        <div className="pl-4 md:pl-8 pt-4 md:pt-4 text-md md:text-lg text-white">
          in your wishlist
        </div>
      </div>
      <div className="col-span-3 sm:col-span-1 rounded-lg pb-10 md:pb-20 bg-gradient-to-r from-blue-400 to-pink-500 ">
        <div className="pt-4 md:pt-8 pl-4 md:pl-8 text-xl md:text-2xl text-white font-bold">
          {orders ? orders.length : 0} Product(s)
        </div>
        <div className="pl-4 md:pl-8 pt-4 md:pt-4 text-md md:text-lg text-white">
          you order
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  wishlist: selectUserWishlist,
  orders: selectUserOrdersHistory,
  cards: selectCartProductsCount,
});

export default connect(mapStateToProps)(UserCardCount);
