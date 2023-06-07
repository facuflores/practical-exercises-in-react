import { createSlice } from "@reduxjs/toolkit";
import { GetAllRkAndMtGenderList, GetAllRkAndMtStatusList, RkAndMtKeyAndValue } from "../store/data/RkAndMtKeyAndValue.type";

/**
 * Store (App)
 */
type RkAndMtAppState = {
  statusList: RkAndMtKeyAndValue[];
  genderList: RkAndMtKeyAndValue[];
};

const initialState: RkAndMtAppState = {
  statusList: [],
  genderList: []
};

/**
 * Reducer (App)
 */
const RkAndMtAppReducer = createSlice({
  name: "app-reducer",
  initialState,
  reducers: {
    onSearchAllStatus: (state) => {
      state.statusList = GetAllRkAndMtStatusList();
    },
    onSearchAllGenders: (state) => {
      state.genderList = GetAllRkAndMtGenderList();
    },
  }
});

/**
 * Actions (App)
 */
export const {
  onSearchAllStatus,
  onSearchAllGenders
} = RkAndMtAppReducer.actions;

/**
 * Principal
 */
export default RkAndMtAppReducer.reducer;