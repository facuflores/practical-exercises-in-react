import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApuUserStateType, ApuUserType } from "../data/ApuData.type";

/**
 * Store
 */
const initialState: ApuUserStateType = {
  usersList: [],
};

/**
 * Reducer
 */
const ApuUserReducer = createSlice({
  initialState,
  name: "apu-user-reducer",
  reducers: {
    ApuCreateUserAction: (state, {payload}: PayloadAction<ApuUserType>) => {
      const userIDs: number[] = state.usersList.map((u) => u.id);
      const userID = (userIDs.length > 0) ? (Math.max(...userIDs) + 9999) : -1;
      state.usersList.push({...payload, id: userID});
    },
    ApuUpdateUserAction: (state, {payload}: PayloadAction<ApuUserType>) => {
      state.usersList = state.usersList.map((u) => {
        if (u.id !== payload.id) return u;
        return payload;
      });
    },
    ApuUpdateUserListAction: (state, {payload}: PayloadAction<Array<ApuUserType>>) => {
      state.usersList = payload;
    },
    ApuDeleteUserByIdAction: (state, {payload}: PayloadAction<number>) => {
      state.usersList = state.usersList.filter((u) => u.id !== payload);
    }
  }
});

/**
 * Actions
 */
export const {
  ApuCreateUserAction,
  ApuUpdateUserAction,
  ApuUpdateUserListAction,
  ApuDeleteUserByIdAction,
} = ApuUserReducer.actions;

/**
 * Principal
 */
export default ApuUserReducer.reducer;