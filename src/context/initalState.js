import { fetchCart, fetchUser, fetchBBT } from "../utils/fetchLocalStorageData";
const userInfo = fetchUser();
const cartInfo = fetchCart();
const bbtInfo = fetchBBT();

export const initialState = {
  user: userInfo,
  bbtItems: null,
  cartShow: false,
  cartItems: cartInfo,
  custShow: false,
  selectedProduct: bbtInfo,
  orderID: null
};
