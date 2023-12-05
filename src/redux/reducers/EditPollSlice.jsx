import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";

const optionsSlice = createSlice({
  name: "addOptions",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const updateTitle = (value, id) => async (dispatch) => {
  dispatch(optionsSlice.actions.startLoading());
  try {
    const response = await axiosInstance.put(
      `update_poll_title?id=${id}&title=${value}`,
      { value, id }
    );
    dispatch(optionsSlice.actions.loginSuccess(response.data));
  } catch (e) {
    dispatch(optionsSlice.actions.hasError(e));
  }
};

export const { startLoading, hasError, loginSuccess, resetReducer } =
  optionsSlice.actions;
export default optionsSlice.reducer;
