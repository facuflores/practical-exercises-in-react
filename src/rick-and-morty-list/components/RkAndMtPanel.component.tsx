import { Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CharacterFilterComponent from "./character/RkAndMtCharacterFilter.component";
import CharacterListComponent from "./character/RkAndMtCharacterList.component";
import RkAndMtEpisodeFilterComponent from "./episodes/RkAndMtEpisodeFilter.component";
import RkAndMtEpisodeListComponent from "./episodes/RkAndMtEpisodeList.component";
import RkAndMtLocationFilterComponent from "./locations/RkAndMtLocationFilter.component";
import RkAndMtLocationListComponent from "./locations/RkAndMtLocationList.component";

const CharacterTabPanel = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CharacterFilterComponent />
      </Grid>
      <Grid item xs={12}>
        <CharacterListComponent />
      </Grid>
    </Grid>
  );
};

const LocationTabPanel = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RkAndMtLocationFilterComponent />
      </Grid>
      <Grid item xs={12}>
        <RkAndMtLocationListComponent />
      </Grid>
    </Grid>
  );
};

const EpisodeTabPanel = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RkAndMtEpisodeFilterComponent />
      </Grid>
      <Grid item xs={12}>
        <RkAndMtEpisodeListComponent />
      </Grid>
    </Grid>
  );
};

const RkAndMtPanelComponent = () => {

  const [tabSelected, setTabSelected] = useState(0);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tabs 
          value={tabSelected}
          onChange={(e, value) => setTabSelected(value)}
        >
          <Tab label="Personajes" />
          <Tab label="Lugares" />
          <Tab label="Episodios" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {tabSelected === 0 && <CharacterTabPanel />}
        {tabSelected === 1 && <LocationTabPanel />}
        {tabSelected === 2 && <EpisodeTabPanel />}
      </Grid>
    </Grid>
  );
};

export default RkAndMtPanelComponent;