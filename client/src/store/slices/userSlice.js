import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    message: null,
    users: [],
  },
  reducers: {
    getAllUsersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.users;
    },
    getAllUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewAdminRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewAdminSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.users.push(action.payload.user);
    },
    addNewAdminFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
});

export const resetUserSlice = () => (dispatch) => {
  dispatch(userSlice.actions.resetUserSlice());
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.getAllUsersRequest());
  await axios
    .get("http://localhost:4000/api/v1/user/all", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(userSlice.actions.getAllUsersSuccess(res.data));
    })
    .catch((error) => {
      dispatch(userSlice.actions.getAllUsersFailed(error.response.data.message));
    });
};

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  await axios
    .post("http://localhost:4000/api/v1/user/add/new-admin", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(userSlice.actions.addNewAdminSuccess(res.data));
    })
    .catch((error) => {
      dispatch(userSlice.actions.addNewAdminFailed(error.response.data.message));
    });
};

export default userSlice.reducer;

