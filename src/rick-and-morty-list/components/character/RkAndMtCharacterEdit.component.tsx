import { Button, Card, CardContent, FormControl, TextField, Typography, Divider } from "@mui/material";
import { FindOneCharacterByIdAsync } from "../../redux/RkAndMtCharacter.service";
import { GetAllRkAndMtGenderList, GetAllRkAndMtStatusList } from "../../store/data/RkAndMtKeyAndValue.type";
import { GetRkAndMtCharacterTypeDefault, RkAndMtCharacterType } from "../../store/data/RkAndMtData.type";
import { RkAndMtCharacterSchema } from "./validations/RkAndMtCharacter.schema";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import useAsyncEffect from "use-async-effect";
import { onUpdateCharacter } from "../../redux/RkAndMtCharacter.reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../to-move/test-react-redux/principal.store";
import { RootState } from "../../../shared/redux/App.store";

const RkAndMtCharacterEditComponent = () => {

  const { characterId } = useParams();
  const appNavigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();
  const characterList = useSelector(({rkAndMtCharacter}: RootState) => rkAndMtCharacter.characterList);
  const [characterType, setCharacterType] = useState<RkAndMtCharacterType>(GetRkAndMtCharacterTypeDefault);

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return;
    await findCharacterById(characterId);
  }, [characterId]);

  const findCharacterById = async (id: string = "-1") => {
    const characterId = parseInt(id);
    let character = findCharacterByIdInStore(characterId);

    if (character.isEdit === false)
      character = await FindOneCharacterByIdAsync(characterId);

    if (!character) {
      appNavigate("/rick-and-morty-list");
      return;
    }

    const status = character.status?.toLowerCase() || "none";
    const gender = character.gender?.toLowerCase() || "none";
    setCharacterType({...character, status, gender});
  };

  const findCharacterByIdInStore = (id: number): RkAndMtCharacterType => {
    return characterList.filter((c) => c.id === id) [0];
  };

  const saveCharacter = ({id, name, status, gender, species}: RkAndMtCharacterType) => {
    appDispatch(onUpdateCharacter({id, name, status, gender, species}));
    appNavigate("/rick-and-morty-list");
  };

  const formik = useFormik<RkAndMtCharacterType>({
    initialValues: {
      ...characterType
    },
    enableReinitialize: true,
    validationSchema: RkAndMtCharacterSchema,
    onSubmit: (values: RkAndMtCharacterType) => {
      saveCharacter(values);
    }
  });

  return (
    <Card>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                EDICIÓN DE UN PERSONAJE
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <TextField 
                  disabled
                  id="characterId"
                  name="characterId"
                  type="text"
                  label="ID del Personaje"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <TextField 
                  id="characterName"
                  name="characterName"
                  type="text"
                  label="Nombre del Personaje"
                  value={formik.values.name}
                  onChange={(e) => formik.setFieldValue("name", e.target.value, true)}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  id="characterStatus"
                  name="characterStatus"
                  label="Status del Personaje"
                  value={formik.values.status}
                  onChange={(e) => formik.setFieldValue("status", e.target.value, true)}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                >
                  <MenuItem key="none" value="none">
                    -- Seleccione Status --
                  </MenuItem>

                  {GetAllRkAndMtStatusList().map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="characterSpecies"
                  name="characterSpecies"
                  type="text"
                  label="Species del Personaje"
                  value={formik.values.species}
                  onChange={(e) => formik.setFieldValue("species", e.target.value, true)}
                  error={formik.touched.species && Boolean(formik.errors.species)}
                  helperText={formik.touched.species && formik.errors.species}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  select
                  id="characterGender"
                  name="characterGender"
                  label="Género del Personaje"
                  value={formik.values.gender}
                  onChange={(e) => formik.setFieldValue("gender", e.target.value, true)}
                  error={formik.touched.species && Boolean(formik.errors.species)}
                  helperText={formik.touched.species && formik.errors.species}
                >
                  <MenuItem key="none" value="none">
                    -- Seleccione Género  --
                  </MenuItem>

                  {GetAllRkAndMtGenderList().map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item 
              xs={12} md={6} 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
            >
              <Button variant="contained" type="submit">
                Actualizar Cambios
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default RkAndMtCharacterEditComponent;
