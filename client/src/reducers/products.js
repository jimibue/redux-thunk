// {type:"ADD_ZZZ", payload?}

import Axios from "axios";

const PRODUCTS = "PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

// ACTIONS

// getProduct that we call in our componentDidMount if our Products
export const getProducts = () => {
  // thunk is letting us write code this way
  return (dispatch) => {
    Axios.get("/api/products").then((res) => {
      dispatch({ type: PRODUCTS, products: res.data });
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    Axios.delete(`/api/products/${id}`).then((res) => {
      dispatch({ type: DELETE_PRODUCT, id: res.data.id });
    });
  };
};

export const editProduct = (id) => {
  return (dispatch) => {
    Axios.put(`/api/products/${id}`).then((res) => {
      dispatch({ type: EDIT_PRODUCT, product: res.data });
    });
  };
};

export const addProduct = (product, history) => {
  return (dispatch) => {
    Axios.post("/api/products", product).then((res) => {
      dispatch({ type: ADD_PRODUCT, product: res.data });
      history.push("/products");
    });
  };
};

// e.preventDefault();
// const product = { ...this.state };
// axios.post("/api/products", product).then(res => {
//   this.props.history.push("/products");
// });
// this.setState({ ...this.defaultValues });

// REDUCER
export default function products(state = [], action) {
  switch (action.type) {
    case PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.id);
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product.id === action.product.id) return action.product;
        return product;
      });
    case ADD_PRODUCT:
      return [action.product, ...state];
    default:
      return state;
  }
}
