import { AppBar, Box, Button, Card, CardContent, Grid, Toolbar } from '@mui/material';
import './App.css';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
      <div className="App">
        <Grid container className="content-center-x-y">
          <Grid item xs={12} md={6} mt={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AppBar position="static">
                  <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="center">
                      <Button sx={{ display: 'block' }}><Link to="/to-do-list" style={{textDecoration: 'none', color: 'white'}}>To Do List</Link></Button>
                      <Button sx={{ display: 'block' }}><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Rick & Morty List</Link></Button>
                      <Button sx={{ display: 'block' }}><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Admin of Posts and Users</Link></Button>
                    </Box>
                  </Toolbar>
                </AppBar>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Outlet />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}

export default App;
