import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  getUserOrdersHistoryAndAddressesAndPickUpPointsStart,
  getUserWishlistStart,
  initializeApp,
} from "../src/redux/modules/user/action";
import wrapper from "../src/redux/store";
import "../styles/global.css";
import { getCartProductsFromLocalStorageStart } from "../src/redux/modules/cart/action";
import ActionStatus from "../src/components/ActionStatus";
import Head from "next/head";
import { getAllCurrenciesStart } from "../src/redux/modules/app/actions";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const user = useSelector(
    ({
      user: {
        data: { data },
      },
    }) => data
  );
  const token = useSelector(({ user: { access_token } }) => access_token);

  useEffect(() => {
    dispatch(initializeApp());
    dispatch(getCartProductsFromLocalStorageStart());
    dispatch(getAllCurrenciesStart());
  }, []);

  useEffect(() => {
    if (user && token) {
      dispatch(getUserWishlistStart(user.id, token));
      dispatch(
        getUserOrdersHistoryAndAddressesAndPickUpPointsStart(user.id, token)
      );
    }
  }, [token]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>CityMag - MarketPlace</title>

        {/*<link rel="manifest" href="/manifest.json" />*/}
        <link
          href="/public/logo.jpg"
          rel="icon"
          type="image/jpg"
          sizes="16x16"
        />
        <link
          href="/public/logo.jpg"
          rel="icon"
          type="image/jpg"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/public/logo.jpg" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <AlertProvider template={AlertTemplate} {...options}>
        <ActionStatus />
        <Component {...pageProps} />
      </AlertProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
