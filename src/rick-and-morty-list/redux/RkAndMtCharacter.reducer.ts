import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RkAndMtCharacterType } from "../store/data/RkAndMtData.type";
import { FindOneCharacterById, SearchAllCharacterByFilters } from "./RkAndMtCharacter.service";

/**
 * Store (Character)
 */
type RkAndMtCharacterState = {
  characterList: RkAndMtCharacterType[];
  characterDetail: RkAndMtCharacterType | undefined;
};

const initialState: RkAndMtCharacterState = {
  characterList: [],
  characterDetail: undefined
};

/**
 * Reducer (Character)
 */
const RkAndMtCharacterSlice = createSlice({
  name: "character-reducer",
  initialState,
  reducers: {
    onUpdateCharacter: (state, {payload}: PayloadAction<RkAndMtCharacterType>) => {
      state.characterList = state.characterList.map((c) => {
        if (c.id !== payload.id) return c;
        return {
          ...c,
          name: payload.name, 
          status: payload.status, 
          gender: payload.gender,
          species: payload.species,
          isEdit: true
        };
      });
    },
    OnDeleteCharacterById: (state, {payload}: PayloadAction<number>) => {
      state.characterList = state.characterList.filter((c) => c.id !== payload);
    },
    OnCloseCharacterDetailDialog: (state) => {
      state.characterDetail = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SearchAllCharacterByFilters.fulfilled, (state, {payload}) => {
      state.characterList = payload;
    })
    builder.addCase(FindOneCharacterById.fulfilled, (state, {payload}) => {
      state.characterDetail = payload;
    })
  },
});

/**
 * Actions (Character)
 */
export const {
  onUpdateCharacter,
  OnDeleteCharacterById,
  OnCloseCharacterDetailDialog
} = RkAndMtCharacterSlice.actions;

/**
 * Principal
 */
export default RkAndMtCharacterSlice.reducer;