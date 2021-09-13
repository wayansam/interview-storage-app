import axios from "axios";
import {
  FETCH_USER,
  PROCESS_STATUS,
  FETCH_ITEM,
  FETCH_CATEGORY,
  CONFIRM_FORM,
} from "./types";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("userToken"));
  return user;
};

const isParam = (val) => {
  return val && val !== "";
};

export const authUser = () => async (dispatch) => {
  dispatch({
    type: FETCH_USER,
    payload: getToken(),
  });
};

export const fetchUser = (username, password) => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  const res = await axios.post(
    "/login",
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    {
      auth: {
        username: username,
        password: password,
      },
    }
  );
  if (res && res.status === 200) {
    localStorage.setItem(
      "userToken",
      JSON.stringify(res.headers.authorization)
    );
    dispatch({ type: PROCESS_STATUS, payload: "success" });
    dispatch({
      type: FETCH_USER,
      payload: res.headers.authorization,
    });
  } else {
    dispatch({ type: PROCESS_STATUS, payload: "not permited" });
    dispatch({
      type: FETCH_USER,
      payload: "",
    });
    localStorage.removeItem("userToken");
  }

  // axios.post("http://localhost:3001/login",
  //     {},
  //     {
  //         auth: {
  //             username: username,
  //             password: password
  //         }
  //     },
  // ).then(res => {
  //     if (res.status == 200) {
  //         console.log("Login Success");
  //         dispatch({ type: PROCESS_STATUS, payload: "success" });
  //         dispatch({
  //             type: FETCH_USER,
  //             payload: res.headers.authorization
  //         });
  //     } else {
  //         console.log("failed");
  //         dispatch({ type: PROCESS_STATUS, payload: "not permited" });
  //         dispatch({
  //             type: FETCH_USER,
  //             payload: ''
  //         });
  //     };
  // }).catch(e => {
  //     console.log({ e });
  // });
};

export const clearUser = () => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  dispatch({ type: FETCH_USER, payload: "" });
  localStorage.removeItem("userToken");
  dispatch({ type: PROCESS_STATUS, payload: "success" });
};

export const fetchItem = (page, size) => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  const token = getToken();
  const res = await axios.get("/items", {
    headers: { Authorization: token },
    params: { page, size },
  });
  dispatch({ type: FETCH_ITEM, payload: res.data.payload });
  dispatch({ type: PROCESS_STATUS, payload: "success" });
};

export const confirmForm =
  (name, quantity, price, category, condition, stockedDate) =>
  async (dispatch) => {
    dispatch({ type: PROCESS_STATUS, payload: "loading" });
    if (
      isParam(name) &&
      isParam(quantity) &&
      isParam(price) &&
      isParam(category) &&
      isParam(condition) &&
      isParam(stockedDate)
    ) {
      dispatch({
        type: CONFIRM_FORM,
        payload: {
          data: {
            name,
            quantity,
            price,
            category,
            condition,
            stockedDate,
          },
        },
      });
      dispatch({ type: PROCESS_STATUS, payload: "confirmed" });
    } else {
      dispatch({ type: PROCESS_STATUS, payload: "not complete" });
    }
  };

export const clearForm = () => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  dispatch({ type: CONFIRM_FORM, payload: null });
  dispatch({ type: PROCESS_STATUS, payload: "success" });
};

export const backToAdd = () => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  dispatch({ type: PROCESS_STATUS, payload: "success" });
};

export const submitForm = (data) => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  const token = getToken();
  const res = await axios.post("/items", data, {
    headers: {
      Authorization: token,
    },
  });
  if (res.status === 200) {
    dispatch({
      type: PROCESS_STATUS,
      payload: { status: res.data.status, code: "success" },
    });
  } else {
    dispatch({
      type: PROCESS_STATUS,
      payload: { status: res.data.status, code: "failed" },
    });
  }
};

export const fetchCategory = () => async (dispatch) => {
  dispatch({ type: PROCESS_STATUS, payload: "loading" });
  const token = getToken();
  const res = await axios.get("/item-categories", {
    headers: { Authorization: token },
  });
  if (res.status === 200) {
    let data = res.data.payload.data;
    data.forEach((element) => {
      Object.assign(element, {
        key: element.$loki,
        text: element.name,
        value: element.name,
      });
    });
    dispatch({ type: FETCH_CATEGORY, payload: data });
    dispatch({ type: PROCESS_STATUS, payload: "success" });
  } else {
    dispatch({ type: FETCH_CATEGORY, payload: null });
    dispatch({ type: PROCESS_STATUS, payload: "failed" });
  }
};
