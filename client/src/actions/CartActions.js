export const AddItemToCart = (quantity, product) => {
  return { type: "CART_ADD_ITEM", payload: { quantity: +quantity, product } };
};

export const RemoveItemFromCart = (name) => {
  return { type: "CART_REMOVE_ITEM", payload: name };
};

export const SetExistingCart = (cartItems) => {
  return { type: "SET_CART", payload: cartItems };
};

export const PurchaseCart = () => {
  return { type: "CART_PURCHASE", payload: [] };
};
