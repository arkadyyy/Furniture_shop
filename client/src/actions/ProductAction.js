import axios from "axios";

export const ProductsRequest = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/products");
    console.log(data);
    dispatch({
      type: "PRODUCTS_REQUEST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_REQUEST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
