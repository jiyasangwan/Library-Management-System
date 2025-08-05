import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    message: null,
    borrowedBooks: [],
    allBorrowedBooks: [],
  },
  reducers: {
    recordBorrowRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBorrowSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    recordBorrowFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getMyBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getMyBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.borrowedBooks = action.payload.borrowedBooks;
    },
    getMyBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.allBorrowedBooks = action.payload.borrowedBooks;
    },
    getAllBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetBorrowSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
});

export const resetBorrowSlice = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export const recordBorrow = (bookId, email) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBorrowRequest());
  await axios
    .post(`http://localhost:4000/api/v1/borrow/record-borrow-book/${bookId}`, { email }, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(borrowSlice.actions.recordBorrowSuccess(res.data));
    })
    .catch((error) => {
      dispatch(borrowSlice.actions.recordBorrowFailed(error.response.data.message));
    });
};

export const getMyBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.getMyBorrowedBooksRequest());
  await axios
    .get("http://localhost:4000/api/v1/borrow/my-borrowed-books", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(borrowSlice.actions.getMyBorrowedBooksSuccess(res.data));
    })
    .catch((error) => {
      dispatch(borrowSlice.actions.getMyBorrowedBooksFailed(error.response.data.message));
    });
};

export const getAllBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.getAllBorrowedBooksRequest());
  await axios
    .get("http://localhost:4000/api/v1/borrow/borrowed-books-by-users", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(borrowSlice.actions.getAllBorrowedBooksSuccess(res.data));
    })
    .catch((error) => {
      dispatch(borrowSlice.actions.getAllBorrowedBooksFailed(error.response.data.message));
    });
};

export const returnBook = (bookId) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());
  await axios
    .put(`http://localhost:4000/api/v1/borrow/return-borrowed-book/${bookId}`, {}, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(borrowSlice.actions.returnBookSuccess(res.data));
    })
    .catch((error) => {
      dispatch(borrowSlice.actions.returnBookFailed(error.response.data.message));
    });
};

export default borrowSlice.reducer;

