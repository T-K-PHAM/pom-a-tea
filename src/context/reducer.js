export const actionType = {
  SET_USER: "SET_USER",
  SET_BBT_ITEMS: "SET_BBT_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_CUSTOM_SHOW: "SET_CUSTOM_SHOW",
  SET_SELECTED_PRODUCT: "SET_SELECTED_PRODUCT",
  SET_ORDER_ID: "SET_ORDER_ID",
  SET_PROMOS: "SET_PROMOS",
  SET_FAV: "SET_FAV",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_BBT_ITEMS:
      return {
        ...state,
        bbtItems: action.bbtItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionType.SET_CUSTOM_SHOW:
      return {
        ...state,
        custShow: action.custShow,
      };

    case actionType.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      };
    
      case actionType.SET_ORDER_ID:
        return {
          ...state,
          orderID: action.orderID,
        };

    case actionType.SET_PROMOS:
      return {
        ...state,
        promos: action.promos,
      };

    case actionType.SET_FAV:
      return {
        ...state,
        favs: action.favs,
      };

    default:
      return state;
  }
};

export default reducer;
