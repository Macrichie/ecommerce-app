import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

// reducer accepts (state, action) in order to update the state and return a new state
export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // AJAX request is sent to backend and we await response
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      // loading is false coz we now have a res data
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      // loading is false coz we now have a error message
      return { loading: false, error: action.payload };
    default:
      // if none of the action types, return state
      return state;
  }
};

export const productDetailsReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
