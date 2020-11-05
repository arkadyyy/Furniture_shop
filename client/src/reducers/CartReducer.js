export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x.product.name === item.product.name
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product.name === existItem.product.name ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product.name !== action.payload
        ),
      };

    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

//   export const cartReducer = (state = { cartItems: [] }, action) => {
//     switch (action.type) {
//       case "CART_ADD_ITEM":
//         const item = action.payload;

//         const existItem = state.cartItems.find(
//           (x) => x.product.name === item.product.name
//         );

//         if (existItem) {
//           return {
//             ...state,
//             cartItems: state.cartItems.map((x) =>
//               x.product === existItem.product.name ? item : x
//             ),
//           };
//         } else {
//           return {
//             ...state,
//             cartItems: [...state.cartItems, item],
//           };
//         }

//       default:
//         return state;
//     }
//   };
