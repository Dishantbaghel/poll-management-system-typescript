import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { AppDispatch } from "../Store";

interface SignupState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: string[];
}

const signupSlice = createSlice({
  name: "signup",
  initialState : {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
  } as SignupState,
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

export const signup = (payload: { name: string; password: string; role: string }) => async (dispatch: AppDispatch) => {
  dispatch(signupSlice.actions.startLoading());
  try {
    const response = await axiosInstance.post(
      `add_user?username=${payload.name}&password=${payload.password}&role=${payload.role}`
    );
    dispatch(signupSlice.actions.loginSuccess(response.data));
  } catch (e) {
    dispatch(signupSlice.actions.hasError(e));
  }
};

export const { startLoading, hasError, loginSuccess, resetReducer } = signupSlice.actions;
export default signupSlice.reducer;
