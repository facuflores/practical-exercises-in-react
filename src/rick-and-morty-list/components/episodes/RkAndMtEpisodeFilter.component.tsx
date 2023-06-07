import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { Card, CardContent, FormControl, TextField } from "@mui/material"
import { SearchAllEpisodesByNameAsyncThunk } from "../../redux/RkAndMtEpisode.service";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useDeboucingEffect from "../../../shared/hooks/useDeboucingEffect";

const RkAndMtEpisodeFilterComponent = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const [searchByEpisodeName, setSearchByEpisodeName] = useState<string>("");

  useEffect(() => searchAllLocationsByName(), []);
  useDeboucingEffect(() => searchAllLocationsByName(), 3000, [searchByEpisodeName]);

  const searchAllLocationsByName = () => {
    console.log(`launching actions -> search episode by name: ${searchByEpisodeName}`);
    appDispatch(SearchAllEpisodesByNameAsyncThunk(searchByEpisodeName));
  };

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth margin="normal">
          <TextField 
            id="episodeName"
            name="episodeName"
            label="Nombre del episodio (with hook deboucing)"
            value={searchByEpisodeName}
            onChange={(e) => setSearchByEpisodeName(e.target.value)}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default RkAndMtEpisodeFilterComponent;