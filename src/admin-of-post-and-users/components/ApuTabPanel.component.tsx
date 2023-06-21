import { Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ApuPostTabPanelComponent from "./posts/ApuPostTabPanel.component";
import ApuUserTabPanelComponent from "./users/ApuUserTabPanel.component";

const ApuTabPanelComponent = () => {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tabs
          value={tabSelected}
          onChange={(e, value) => setTabSelected(value)}
        >
          <Tab label="Usuarios" />
          <Tab label="Posts" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        { tabSelected === 0 && <ApuUserTabPanelComponent /> }
        { tabSelected === 1 && <ApuPostTabPanelComponent /> }
      </Grid>
    </Grid>
  );
};

export default ApuTabPanelComponent;