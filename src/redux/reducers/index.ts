import { combineReducers } from "@reduxjs/toolkit";
import SignUpSlice from "./SignUpSlice";
import loginSlice from './LoginSlice';
import AdminSlice from "./AdminSlice";
import AddPollSlice from "./AddPollSlice";
import DeletePollSlice from "./DeletePollSlice";
import DeleteOptionSlice from "./DeleteOptionSlice";
import AddOptionSlice from "./AddOptionSlice";
import EditPollSlice from "./EditPollSlice";
import VoteSlice from "./VoteSlice";

const rootReducer = combineReducers({
  SignUpSlice: SignUpSlice,
  loginSlice: loginSlice,
  AdminSlice: AdminSlice,
  AddPollSlice: AddPollSlice,
  AddOptionSlice: AddOptionSlice,
  DeletePollSlice: DeletePollSlice,
  DeleteOptionSlice: DeleteOptionSlice,
  OptionsSlice: EditPollSlice,
  VoteSlice: VoteSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export type SignUpSliceState = ReturnType<typeof SignUpSlice>;
export type LoginSliceState = ReturnType<typeof loginSlice>;
export type AdminSliceState = ReturnType<typeof AdminSlice>;
export type AddPollSliceState = ReturnType<typeof AddPollSlice>;
export type AddOptionSliceState = ReturnType<typeof AddOptionSlice>;
export type DeletePollSliceState = ReturnType<typeof DeletePollSlice>;
export type DeleteOptionSliceState = ReturnType<typeof DeleteOptionSlice>;
export type EditPollSliceState = ReturnType<typeof EditPollSlice>;
export type VoteSliceState = ReturnType<typeof VoteSlice>;
