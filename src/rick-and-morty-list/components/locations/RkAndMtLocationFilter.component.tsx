import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { Card, CardContent, FormControl, TextField } from "@mui/material"
import { SearchAllLocationsByNameAsyncThunk } from "../../redux/RkAndMtLocation.service";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useDeboucingEffect from "../../../shared/hooks/useDeboucingEffect";

const RkAndMtLocationFilterComponent = () => {
  const appDispatch = useDispatch<AppDispatch>();
  const [searchByLocationName, setSearchLocationName] = useState<string>("");

  useEffect(() => searchAllLocationsByName(), []);
  useDeboucingEffect(() => searchAllLocationsByName(), 3000, [searchByLocationName]);

  const searchAllLocationsByName = () => {
    console.log(`launching actions -> search location by name: ${searchByLocationName}`);
    appDispatch(SearchAllLocationsByNameAsyncThunk(searchByLocationName));
  };

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth margin="normal">
          <TextField 
            id="locationName"
            name="locationName"
            label="Nombre de la ubicación (with hook deboucing)"
            value={searchByLocationName}
            onChange={(e) => setSearchLocationName(e.target.value)}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default RkAndMtLocationFilterComponent;