import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { Button, Card, CardContent, FormControl, Grid, Tab, Tabs, MenuItem, Box } from "@mui/material";
import { onSearchAllGenders, onSearchAllStatus } from "../../redux/RkAndMtApp.reducer";
import { RkAndMtCharacterFilterType } from "../../store/data/RkAndMtFilter.type";
import { RkAndMtKeyAndValue } from "../../store/data/RkAndMtKeyAndValue.type";
import { RootState } from "../../../shared/redux/App.store";
import { SearchAllCharacterByFilters } from "../../redux/RkAndMtCharacter.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';

const RkAndMtCharacterFilterComponent = () => {

  const appDispatch = useDispatch<AppDispatch>();
  const characterStatusList = useSelector(({rkAndMtApp}: RootState) => rkAndMtApp.statusList);
  const characterGenderList = useSelector(({rkAndMtApp}: RootState) => rkAndMtApp.genderList);
  const [characterFilter, setCharacterFilter] = useState<RkAndMtCharacterFilterType>({status: "none", gender: "none"});
  const [characterName, setCharacterName] = useState<string>("");

  useEffect(() => {
    appDispatch(onSearchAllStatus());
    appDispatch(onSearchAllGenders());
  }, []);

  useEffect(() => {
    if (characterName.length > 0) {
      const searchCharactersByName = setTimeout(() => searchCharacters(), 3000);
      return () => clearTimeout(searchCharactersByName);
    }
  }, [characterName]);

  const searchCharacters = () => {
    appDispatch(SearchAllCharacterByFilters({
      name: characterName,
      status: characterFilter.status === "none" ? "" : characterFilter.status,
      gender: characterFilter.gender === "none" ? "" : characterFilter.gender
    }));
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="characterName"
                type="text"
                name="characterName"
                label="Nombre del personaje (Delay)"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="characterStatus"
                name="characterStatus"
                label="Estado del personaje"
                select
                value={characterFilter.status}
                onChange={(e) => setCharacterFilter({...characterFilter, status: e.target.value})}
              >
                <MenuItem key="none" value="none">
                  -- Seleccionar estado --
                </MenuItem>

                {characterStatusList.map((option: RkAndMtKeyAndValue) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="characterGender"
                name="characterGender"
                label="Género del personaje"
                select
                value={characterFilter.gender}
                onChange={(e) => setCharacterFilter({...characterFilter, gender: e.target.value})}
              >
                <MenuItem key="none" value="none">
                    -- Seleccione género --
                </MenuItem>

                {characterGenderList.map((option: RkAndMtKeyAndValue) => (
                    <MenuItem key={option.key} value={option.key}>
                        {option.value}
                    </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
            <Grid item xs={12} md={3} 
              display="flex" 
              justifyContent="center" 
              alignItems="center">
              <Button
                fullWidth
                variant="contained"
                onClick={() => searchCharacters()}>
                Buscar
              </Button>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RkAndMtCharacterFilterComponent;