import { createAsyncThunk } from "@reduxjs/toolkit";
import { RkAndMtEpisodeType } from "../store/data/RkAndMtData.type";
import { RkAndMtHttpResponseType } from "../store/data/RkAndMtHttp.type";

const API_URL = "https://rickandmortyapi.com/api/episode/";

/**
 * Episodes
 * Search All by Name
 */
const SearchAllEpisodesByNameAsyncThunk = createAsyncThunk<RkAndMtEpisodeType[], string>("episodes/searchAll", async (name: string) => {
  let queryUrl = API_URL.concat(`?name=${name}`);
  const response = await fetch(queryUrl);
  const httpResponse = (await response.json()) as RkAndMtHttpResponseType<RkAndMtEpisodeType[]>;
  return httpResponse.results;
});

/**
 * Search All with Url Array
 */
const SearchAllEpisodeWithUrlArray = async (urls: string[]): Promise<RkAndMtEpisodeType[]> => {
  const response = await fetch(API_URL.concat(`[${extractIdsFromUrlArray(urls)}]`));
  return (await response.json()) as RkAndMtEpisodeType[];
};

const extractIdsFromUrlArray = (urls: string[]): string => {
  const idsInArray = urls.map((u) => u.charAt(u.length - 1));
  return idsInArray.toString();
};

export {
  SearchAllEpisodesByNameAsyncThunk,
  SearchAllEpisodeWithUrlArray
};