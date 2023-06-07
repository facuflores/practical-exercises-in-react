import { createAsyncThunk } from "@reduxjs/toolkit";
import { RkAndMtLocationType } from "../store/data/RkAndMtData.type";
import { RkAndMtHttpResponseType } from "../store/data/RkAndMtHttp.type";

const API_URL = "https://rickandmortyapi.com/api/location/";

/**
 * Locations
 * Search All by Name
 */
const SearchAllLocationsByNameAsyncThunk = createAsyncThunk<RkAndMtLocationType[], string>("locations/searchAll", async (name: string) => {
  let queryUrl = API_URL.concat(`?name=${name}`);
  const response = await fetch(queryUrl);
  const httpResponse = (await response.json()) as RkAndMtHttpResponseType<RkAndMtLocationType[]>;
  return httpResponse.results;
});

/**
 * Find One by ID
 */
const FindOneLocationByIdAsyncThunk = createAsyncThunk<RkAndMtLocationType, number>("locations/byId", async (id: number) => {
  let queryUrl = API_URL.concat(id.toString());
  const response = await fetch(queryUrl);
  return (await response.json()) as RkAndMtLocationType;
});

const FindOneLocationByUrl = async (url: string): Promise<RkAndMtLocationType> => {
  const response = await fetch(url);
  return (await response.json()) as RkAndMtLocationType;
}; 

export {
  SearchAllLocationsByNameAsyncThunk,
  FindOneLocationByIdAsyncThunk,
  FindOneLocationByUrl,
};