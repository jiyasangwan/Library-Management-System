import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
    book: null,
  },
  reducers: {
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.books.push(action.payload.book);
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAllBooksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload.books;
    },
    getAllBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.books = state.books.filter(book => book._id !== action.payload.bookId);
    },
    deleteBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
});

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post("http://localhost:4000/api/v1/book/admin/add", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(bookSlice.actions.addBookSuccess(res.data));
    })
    .catch((error) => {
      dispatch(bookSlice.actions.addBookFailed(error.response.data.message));
    });
};

export const getAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.getAllBooksRequest());
  await axios
    .get("http://localhost:4000/api/v1/book/all", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(bookSlice.actions.getAllBooksSuccess(res.data));
    })
    .catch((error) => {
      dispatch(bookSlice.actions.getAllBooksFailed(error.response.data.message));
    });
};

export const deleteBook = (id) => async (dispatch) => {
  dispatch(bookSlice.actions.deleteBookRequest());
  await axios
    .delete(`http://localhost:4000/api/v1/book/delete/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(bookSlice.actions.deleteBookSuccess({ ...res.data, bookId: id }));
    })
    .catch((error) => {
      dispatch(bookSlice.actions.deleteBookFailed(error.response.data.message));
    });
};

export default bookSlice.reducer;

