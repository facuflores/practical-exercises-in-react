import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Utils from "../../shared/utils/Utils";
import { ApuPostStateType, ApuPostType } from "../data/ApuPost.type";

//Store
const initialState: ApuPostStateType = {postList: []};

//Reducer
const ApuPostReducer = createSlice({
  initialState,
  name: "apu-post-reducer",
  reducers: {
    ApuSetUserListAction: (state, {payload}: PayloadAction<Array<ApuPostType>>) => {
      state.postList = payload;
    },
    ApuCreatePostAction: (state, {payload}: PayloadAction<ApuPostType>) => {
      const postsListCopy = [...state.postList];
      postsListCopy.unshift({
        ...payload,
        isEdit: true,
        id: Utils.generateId(state.postList.map((u) => u.id))
      });
      state.postList = postsListCopy;
    },
    ApuUpdatePostAction: (state, {payload}: PayloadAction<ApuPostType>) => {
      state.postList = state.postList.map((p) => {
        if (p.id !== payload.id) return p;
        console.log(`post ${p.id}`);
        return payload;
      });
    },
    ApuDeletePostByIdAction: (state, {payload}: PayloadAction<number>) => {
      state.postList = state.postList.filter((p) => p.id !== payload);
    }
  },
});

//Actions
export const {
  ApuSetUserListAction,
  ApuCreatePostAction,
  ApuUpdatePostAction,
  ApuDeletePostByIdAction,
} = ApuPostReducer.actions;

//Main
export default ApuPostReducer.reducer;