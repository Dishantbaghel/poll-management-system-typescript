import {createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../utilities/axios';

const AddOptionSlice = createSlice({
    name : 'addOption',
    initialState : {
        isLoading : false,
        isSuccess : false,
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
    }
})

export function optionsAdd(value, id) {
    return async (dispatch) => {
      dispatch(AddOptionSlice.actions.startLoading());
      try {
        const response = await axiosInstance.post(
          `add_new_option?id=${id}&option_text=${value}`,
          { value, id }
        );
        dispatch(AddOptionSlice.actions.loginSuccess(response.data));
      } catch (e) {
        dispatch(AddOptionSlice.actions.hasError(e));
      }
    };
  }

export const { startLoading, hasError, loginSuccess, resetReducer } =
  AddOptionSlice.actions;
export default AddOptionSlice.reducer;