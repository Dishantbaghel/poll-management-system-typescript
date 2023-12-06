import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/axios';

interface StateType {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Record<string, any>;
}

export const deletePoll = createAsyncThunk('deletePoll/deletePoll', async (id: string) => {
  try {
    const response = await axiosInstance.delete(`delete_poll?id=${id}`, {
      id,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
});

const deletePollSlice = createSlice({
  name: 'deletePoll',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
  } as StateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePoll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deletePoll.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(deletePoll.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default deletePollSlice.reducer;
