import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../Store";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
  };
  
  const deleteOptionSlice = createSlice({
    name: "deleteOption",
    initialState,
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
  
  export function deleteOption(id,opt) {
    return async () => {
      dispatch(deleteOptionSlice.actions.startLoading());
      try {
        const response = await axiosInstance.delete(
          `delete_poll_option?id=${id}&option_text=${opt}`,
          { id,opt }
        );
        dispatch(deleteOptionSlice.actions.loginSuccess(response.data));
      } catch (e) {
        dispatch(deleteOptionSlice.actions.hasError(e));
      }
    };
  }
  
  export const { startLoading, hasError, loginSuccess, resetReducer } =
    deleteOptionSlice.actions;
  export default deleteOptionSlice.reducer;