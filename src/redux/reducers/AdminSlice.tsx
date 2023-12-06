import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/axios';
import { AppDispatch } from '../Store';

interface StateType {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any[];
}

const AdminSlice = createSlice({
  name: 'AdminpollList',
  initialState : {
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
    loginSuccess(state, action: PayloadAction<{ data: any[] }>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload.data.reverse();
    },
    hasError(state, action: PayloadAction<any>) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = action.payload;
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export const fetchedAllPolls = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosInstance.get('list_polls');
    dispatch(loginSuccess(response.data));
  } catch (e) {
    dispatch(hasError(e));
  }
};

export const { startLoading, hasError, loginSuccess, resetReducer } = AdminSlice.actions;

export default AdminSlice.reducer;
