import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
  };
  
  const signupSlice = createSlice({
    name: "signup",
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

  export function signup(payload) {
    return async (dispatch) => {
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
  }
  
  export const { startLoading, hasError, loginSuccess, resetReducer } = signupSlice.actions;
  export default signupSlice.reducer;