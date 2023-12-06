import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AppDispatch } from '../Store';
import axiosInstance from '../../utilities/axios';

interface StateType {
  isLoading : boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Record<string, any>;
}

const AddPollSlice = createSlice({
    name: "addPoll",
    initialState : {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: {},
      } as StateType,
    reducers: {
      startLoading(state) {
        state.isLoading = true;
        state.isError = false;
      },
      loginSuccess(state, action : PayloadAction<any>) {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = { ...action.payload };
      },
      hasError(state, action : PayloadAction<any>) {
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

  export function AddPoll(newTitle: string, newOptionsList: string[]){
    return async(dispatch : AppDispatch)=>{
        dispatch(AddPollSlice.actions.startLoading());
        try {
            if (newOptionsList.length === 1) {
              const response = await axiosInstance.post(
                `add_poll?title=${newTitle}&options=${newOptionsList[0]}`,
                { newTitle, newOptionsList }
              );
              dispatch(AddPollSlice.actions.loginSuccess(response.data));
            } else if (newOptionsList.length === 2) {
              const response = await axiosInstance.post(
                `add_poll?title=${newTitle}&options=${newOptionsList[0]}____${newOptionsList[1]}`,
                { newTitle, newOptionsList }
              );
              dispatch(AddPollSlice.actions.loginSuccess(response.data));
            } else if (newOptionsList.length === 3) {
              const response = await axiosInstance.post(
                `add_poll?title=${newTitle}&options=${newOptionsList[0]}____${newOptionsList[1]}____${newOptionsList[2]}`,
                { newTitle, newOptionsList }
              );
              dispatch(AddPollSlice.actions.loginSuccess(response.data));
            } else {
              const response = await axiosInstance.post(
                `add_poll?title=${newTitle}&options=${newOptionsList[0]}____${newOptionsList[1]}____${newOptionsList[2]}____${newOptionsList[3]}`,
                { newTitle, newOptionsList }
              );
              dispatch(AddPollSlice.actions.loginSuccess(response.data));
            }
          } catch (e) {
            dispatch(AddPollSlice.actions.hasError(e));
          }
    }
  }

  export const {startLoading,hasError,loginSuccess,resetReducer} = AddPollSlice.actions;
  export default AddPollSlice.reducer;