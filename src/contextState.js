import { createContext, useContext } from "react";
import { jeweliers } from "./utils/constant";
import { useEffect, useReducer } from "react";



export const ShopTodoContext = createContext();

const initialState = {
  product: JSON.parse(localStorage.getItem("auth")) || jeweliers,
};

export const onlineReducer = (state, action) => {
  switch (action.type) {
    case "addProduct":
      return {
        ...state,
        product: state?.product?.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice,
            };
          }
          return item;
        }),
      };
    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.staticPrice,
            };
          }
          return item;
        }),
      };
    case "removeProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 0) {
            return {
              ...item,
              quantity: (item.quantity = 0),
              price: item.staticPrice,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export const ShopTodoProvider = ({ children }) => {
  const [store, dispatchStore] = useReducer(onlineReducer, initialState);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(store.product));
  }, [store?.product]);

  const incProd = (id) =>
    dispatchStore({ type: "incrementProduct", payload: id });

  const decProd = (id) =>
    dispatchStore({
      type: "decrementProduct",
      payload: id,
    });

  const addProd = (id) => dispatchStore({ type: "addProduct", payload: id });

  const removeProduct = (id) =>
    dispatchStore({ type: "removeProduct", payload: id });

  const contextValues = {
    store,
    addProd,
    removeProduct,
    incProd,
    decProd,
  };
  return (
    <ShopTodoContext.Provider value={contextValues}>
      {children}
    </ShopTodoContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopTodoContext);
