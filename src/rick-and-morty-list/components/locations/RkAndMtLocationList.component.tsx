import { Alert, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/redux/App.store";
import { RkAndMtLocationType } from "../../store/data/RkAndMtData.type";

const RkAndMtLocationListComponent = () => {
  const locationListInStore = useSelector(({rkAndMtLocation}: RootState) => rkAndMtLocation.locationList);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {locationListInStore.length <= 0 && (
        <Grid item xs={12}>
          <Alert severity="warning">Por el momento, sin registros ...</Alert>
        </Grid>
      )}
      {locationListInStore.map((location: RkAndMtLocationType) => (
        <Grid item xs={12} md={3} key={location.id}>
          <Card>
            <CardContent>
              <Typography component="div" variant="h5">
                {location.name}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" color="text.secondary" component="div" textAlign="center">
                TIPO: {location.type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RkAndMtLocationListComponent;