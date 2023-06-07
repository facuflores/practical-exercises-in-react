import { Alert, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { AppDispatch } from "../../../../to-move/test-react-redux/principal.store";
import { FindOneLocationByUrl } from "../../../redux/RkAndMtLocation.service";
import { GetRkAndMtCharacterTypeDefault, RkAndMtCharacterType, RkAndMtEpisodeType, RkAndMtLocationType } from "../../../store/data/RkAndMtData.type";
import { GetRkAndMtGenderByKey, GetRkAndMtStatusByKey } from "../../../store/data/RkAndMtKeyAndValue.type";
import { OnCloseCharacterDetailDialog } from "../../../redux/RkAndMtCharacter.reducer";
import { RootState } from "../../../../shared/redux/App.store";
import { SearchAllEpisodeWithUrlArray } from "../../../redux/RkAndMtEpisode.service";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import useAsyncEffect from "use-async-effect";

const RkAndMtCharacterItemDetailDialog = () => {

  const appDispatch = useDispatch<AppDispatch>();
  const characterDetailInStore = useSelector(({rkAndMtCharacter}: RootState) => rkAndMtCharacter.characterDetail);
  const [characterItemDetail, setCharacterItemDetail] = useState<RkAndMtCharacterType>(GetRkAndMtCharacterTypeDefault);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const isCharacterDetailUndefined = characterDetailInStore === undefined;
    if (!isCharacterDetailUndefined) setCharacterItemDetail(characterDetailInStore);
    setOpen(!isCharacterDetailUndefined);
  }, [characterDetailInStore]);

  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || characterItemDetail.id === -1) return;

    const locationType = await findOneLocation();
    const locationTypeResult = locationType !== null ? locationType : undefined;

    const episodeTypes = await searchAllEpisodes();
    const episodeTypesResult = episodeTypes !== null ? episodeTypes : undefined;
    console.log(episodeTypesResult);

    setCharacterItemDetail({
      locationType: locationTypeResult,
      episodeTypes: episodeTypesResult,
      ...characterItemDetail
    });
  }, [characterItemDetail.id]);

  const findOneLocation = async (): Promise<RkAndMtLocationType | null> => {
    const {location} = characterItemDetail;
    if (location === undefined || location.url === undefined) return null;
    return FindOneLocationByUrl(location.url);
  };

  const searchAllEpisodes = async (): Promise<RkAndMtEpisodeType[] | null> => {
    const {episode} = characterItemDetail;
    if (episode === undefined || episode.length <= 0) return null;
    return SearchAllEpisodeWithUrlArray(episode.slice(0, 2));
  };

  const handleClose = () => {
    appDispatch(OnCloseCharacterDetailDialog());
  };

  const renderLastLocationView = () => {
    return (
      <Grid container spacing={2}>
        {!characterItemDetail.locationType && 
          <Grid item xs={12} textAlign="center">
            <Alert severity="warning">Por el momento, sin ubicaciones ...</Alert>
          </Grid>
        }
        {characterItemDetail.locationType &&
          <>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                NOMBRE: {characterItemDetail.locationType.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                TIPO: {characterItemDetail.locationType.type}
              </Typography>
            </Grid>
          </>
        }
      </Grid>
    );
  };

  const renderLastTreeEpisodeView = () => {
    return (
      <Grid container spacing={2}>
        {(!characterItemDetail.episodeTypes || characterItemDetail.episodeTypes.length <= 0) && 
          <Grid item xs={12} textAlign="center">
            <Alert severity="warning">Por el momento, sin episodios ...</Alert>
          </Grid>
        }
        {(characterItemDetail.episodeTypes && characterItemDetail.episodeTypes.length > 0) && 
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {characterItemDetail.episodeTypes.map((episode) => (
                <Grid item xs={12} key={episode.id}>
                  <Card>
                    <Typography component="div" variant="h5" textAlign="center">
                      {episode.name}
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                      Fecha de Salida: {episode.air_date}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                      Codigo de Episodio: {episode.episode}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        }
      </Grid>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del Personaje</DialogTitle>
      <DialogContent>
        {(!characterItemDetail && open) && 
          <Alert severity="warning">Por el momento, sin detalles ...</Alert>
        }
        {(characterItemDetail && open) && 
          <Card>
            <CardMedia
              component="img"
              alt={characterItemDetail.name}
              height="300"
              image={characterItemDetail.image}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="div" variant="h5" textAlign="center">
                    {characterItemDetail.name}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                            ALGUNOS DETALLES
                          </Typography>
                          <Divider />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                            STATUS: {GetRkAndMtStatusByKey(characterItemDetail.status || "-").value}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                            GÉNERO: {GetRkAndMtGenderByKey(characterItemDetail.gender || "-").value}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                            ESPECIES: {characterItemDetail.species}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                        ULTIMA LOCALIZACIÓN
                      </Typography>
                      <Divider />
                      {/*  */}
                      {renderLastLocationView()}
                      {/*  */}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                        ULTIMOS 3 EPISODIOS APARECIDOS
                      </Typography>
                      <Divider />
                      {/*  */}
                      {renderLastTreeEpisodeView()}
                      {/*  */}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RkAndMtCharacterItemDetailDialog;