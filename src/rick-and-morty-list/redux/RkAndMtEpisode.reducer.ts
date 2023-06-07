import { createSlice } from "@reduxjs/toolkit";
import { RkAndMtEpisodeType } from "../store/data/RkAndMtData.type";
import { SearchAllEpisodesByNameAsyncThunk } from "./RkAndMtEpisode.service";

/**
 * Store (Episode)
 */
type RkAndMtEpisodeState = {
  episodeList: RkAndMtEpisodeType[];
};

const initialState: RkAndMtEpisodeState = {
  episodeList: []
};

/**
 * Reducer (Episode)
 */
const RkAndMtEpisodeSlice = createSlice({
  name: "episode-reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SearchAllEpisodesByNameAsyncThunk.fulfilled, (state, {payload}) => {
      if (payload) state.episodeList = payload;
    })
  }
});

/**
 * Actions (Episode)
 */
export const {} = RkAndMtEpisodeSlice.actions;

/**
 * Principal
 */
export default RkAndMtEpisodeSlice.reducer;