import {createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../utilities/axios';

const VoteSlice = createSlice({
    name:'vote',
    initialState:{
        isLoading : false,
        isSuccess : false,
        isError : false,
        data : {},
    },
    reducers:{
        startLoading(state){
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        loginSuccess(state,action){
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = {...action.payload}
        },
        hasError(state){
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
        },
        resetReducer(state) {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.data = {};
        },
    }
})

export function vote(id,option,header){
    return async(dispatch)=>{
        dispatch(VoteSlice.actions.startLoading());
        try {
            const response = await axiosInstance.get( `do_vote?id=${id}&option_text=${option}`,header,{ id, option });
            dispatch(VoteSlice.actions.loginSuccess(response.data))
        } catch (error) {
            dispatch(VoteSlice.actions.hasError(error));
        }
    }
}

export const {startLoading,loginSuccess,hasError,resetReducer} = VoteSlice.actions;
export default VoteSlice.reducer