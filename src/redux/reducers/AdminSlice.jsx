import {createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../utilities/axios';

const AdminSlice = createSlice({
    name: 'AdminpollList',
    initialState :{
        isLoading : false,
        isSuccess : false,
        isError : false,
        data : [],
    },
    reducers:{
        startLoading(state){
            state.isLoading = true;
            state.isError = false;
        },
        loginSucess(state, action){
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload.data.reverse();
        },
        hasError(state,action){
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.data = action.payload;
        },
        resetReducer(state) {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.data = {};
          },
    },
});

export function fetchedAllPolls(){
    return async (dispatch) =>{
        dispatch(AdminSlice.actions.startLoading());
        try{
            const response = await axiosInstance.get('list_polls');
            dispatch(AdminSlice.actions.loginSucess(response.data));
           
        }catch(e){
            dispatch(AdminSlice.actions.hasError(e));
        }
    }
}


export const { startLoading, hasError, loginSuccess } = AdminSlice.actions;

export default AdminSlice.reducer;