import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/axios';
import { AppDispatch } from '../Store';

interface StateType {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Record<string, any>;
}

const initialState: StateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const AddOptionSlice = createSlice({
  name: 'addOption',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action: PayloadAction<any>) {
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

export const optionsAdd = (value: string, id: string) => async (dispatch: AppDispatch) => {
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

export const { startLoading, hasError, loginSuccess, resetReducer } = AddOptionSlice.actions;
export default AddOptionSlice.reducer;
