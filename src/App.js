import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
// import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  // useEffect(() => {                                               ////sending cart data alternative
  //   const sendRequest = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "pending",
  //         message: "Sending the data",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://food-delivery-app-be440-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Sending failed");
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success",
  //         message: "Successfully sent data",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendRequest().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error",
  //         message: "Sending data failed",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
