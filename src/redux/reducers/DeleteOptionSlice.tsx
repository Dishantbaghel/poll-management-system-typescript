import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { AppDispatch } from "../Store";

interface StateType {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: string[];
}

const deleteOptionSlice = createSlice({
  name: "deleteOption",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
  } as StateType,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action: PayloadAction<string[]>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action: PayloadAction<string[]>) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export const deleteOption = (id: string, opt: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteOptionSlice.actions.startLoading());
    try {
      const response = await axiosInstance.delete(
        `delete_poll_option?id=${id}&option_text=${opt}`,
      );
      dispatch(deleteOptionSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(deleteOptionSlice.actions.hasError(e));
    }
  };
};

export const { startLoading, hasError, loginSuccess, resetReducer } =
  deleteOptionSlice.actions;
export default deleteOptionSlice.reducer;
