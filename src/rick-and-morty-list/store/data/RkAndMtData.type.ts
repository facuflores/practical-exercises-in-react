export type RkAndMtCharacterType = {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  image?: string;
  episode?: string[];
  episodeTypes?: RkAndMtEpisodeType[];
  location?: RkAndMtLocation | undefined;
  locationType?: RkAndMtLocationType | undefined;
  isEdit?: boolean;
};

export const GetRkAndMtCharacterTypeDefault: RkAndMtCharacterType = {
  id: -1,
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  image: "",
  episode: [],
  episodeTypes: [],
  location: undefined,
  locationType: undefined,
  isEdit: false
};

export type RkAndMtLocation = {
  name?: string;
  url?: string;
};

export type RkAndMtLocationType = {
  id?: number;
  name?: string;
  type?: string;
  dimension?: string;
  residents?: string[];
};

export type RkAndMtEpisodeType = {
  id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  url?: string;
};
