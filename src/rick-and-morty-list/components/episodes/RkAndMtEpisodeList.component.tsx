import { Alert, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/redux/App.store";
import { RkAndMtEpisodeType } from "../../store/data/RkAndMtData.type";

const RkAndMtEpisodeListComponent = () => {
  const episodeListInStore = useSelector(({rkAndMtEpisode}: RootState) => rkAndMtEpisode.episodeList);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {episodeListInStore.length <= 0 && (
        <Grid item xs={12}>
          <Alert severity="warning">Por el momento, sin registros ...</Alert>
        </Grid>
      )}
      {episodeListInStore.map((episode: RkAndMtEpisodeType) => (
        <Grid item xs={12} md={3} key={episode.id}>
          <Card>
            <CardContent>
              <Typography component="div" variant="h5">
                {episode.name}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                Fecha Lanzamiento: {episode.episode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RkAndMtEpisodeListComponent;