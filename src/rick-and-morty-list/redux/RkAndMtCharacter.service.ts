import { createAsyncThunk } from "@reduxjs/toolkit";
import { RkAndMtCharacterType } from "../store/data/RkAndMtData.type";
import { RkAndMtCharacterFilterType } from "../store/data/RkAndMtFilter.type";
import { RkAndMtHttpResponseType } from "../store/data/RkAndMtHttp.type";

const API_URL = "https://rickandmortyapi.com/api/character/";

/**
 * Characters
 * Search All with Filters
 */
const SearchAllCharacterByFilters = createAsyncThunk<RkAndMtCharacterType[], RkAndMtCharacterFilterType>("characters/searchAll", async (filters) => {
  let queryUrl = API_URL
    .concat("?name=" + (filters.name || ""))
    .concat("&status=" + (filters.status || ""))
    .concat("&gender=" + (filters.gender || ""));
  
  const response = await fetch(queryUrl);
  const httpResponse = (await response.json()) as RkAndMtHttpResponseType<RkAndMtCharacterType[]>;

  return httpResponse.results;
}); 

/**
 * Find One by ID
 */
const FindOneCharacterById = createAsyncThunk<RkAndMtCharacterType, number>("characteres/byId", async (id: number) => {
  let queryUrl = API_URL.concat(id.toString());
  const response = await fetch(queryUrl);
  return (await response.json()) as RkAndMtCharacterType;
});

/**
 * Find One By ID (Async)
 */
const FindOneCharacterByIdAsync = async (id: number): Promise<RkAndMtCharacterType> => {
  let queryUrl = API_URL.concat(id.toString());
  const response = await fetch(queryUrl);
  return (await response.json()) as RkAndMtCharacterType;
};

export {
  SearchAllCharacterByFilters,
  FindOneCharacterById,
  FindOneCharacterByIdAsync
};