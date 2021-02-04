import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const currentItemToBeAdded = action.payload;
      // Note that data._id was stored as product
      const existingItemInCart = state.cartItems.find(
        (item) => item.product === currentItemToBeAdded.product
      );
      // if existingItemInCart is true, then we replace existingItemInCart with currentItemToBeAdded, else add new item to cart
      if (existingItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existingItemInCart.product
              ? currentItemToBeAdded
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, currentItemToBeAdded],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state;
  }
};
