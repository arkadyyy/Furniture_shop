export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCTS_REQUEST_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "PRODUCTS_REQUEST_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PRODUCTS_UPDATED":
      state.products[action.payload.index].name = action.payload.product.name;
      state.products[action.payload.index].category =
        action.payload.product.category;
      state.products[action.payload.index].price = +action.payload.product
        .price;
      state.products[action.payload.index].countInStock = +action.payload
        .product.countInStock;

      return {
        ...state,
      };
    case "PRODUCT_REMOVED":
      return {
        ...state,
        products: action.payload,
      };
    case "PRODUCT_ADDED":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
