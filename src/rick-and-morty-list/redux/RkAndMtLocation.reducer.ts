import { createSlice } from "@reduxjs/toolkit";
import { RkAndMtLocationType } from "../store/data/RkAndMtData.type";
import { SearchAllLocationsByNameAsyncThunk } from "./RkAndMtLocation.service";

/**
 * Store (Location)
 */
type RkAndMtLocationState = {
  locationList: RkAndMtLocationType[];
};

const initialState: RkAndMtLocationState = {
  locationList: []
};

/**
 * Reducer (Location)
 */
const RkAndMtLocationSlice = createSlice({
  name: "location-reducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SearchAllLocationsByNameAsyncThunk.fulfilled, (state, {payload}) => {
      if (payload) state.locationList = payload;
    })
  }
});

/**
 * Actions (Location)
 */
export const {} = RkAndMtLocationSlice.actions;

/**
 * Principal
 */
export default RkAndMtLocationSlice.reducer;