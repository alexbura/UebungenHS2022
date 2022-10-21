import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Timer from './Timer';


function App() {

  return (<>
    <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant='h4'>Counter</Typography>
            </Toolbar>
            </AppBar>
            <br/>
            <br/>
            <Grid>
                <Timer></Timer>
            </Grid> 
  </>)
}

export default App;

