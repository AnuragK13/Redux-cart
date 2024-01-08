import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "pending",
        message: "Sending the data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://food-delivery-app-be440-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending failed");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Successfully sent data",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending data failed",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-delivery-app-be440-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching data failed",
        })
      );
    }
  };
};

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://food-delivery-app-be440-default-rtdb.firebaseio.com/cart.json"
//       );

//       if (!response.ok) {
//         throw new Error("Could not fetch data");
//       }

//       const data = await response.json();

//       return data;
//     };

//     try {
//       const cartData = await fetchData();
//       dispatch(cartActions.replaceCart(cartData));
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error",
//           message: "Fetching data failed",
//         })
//       );
//     }
//   };
// };
