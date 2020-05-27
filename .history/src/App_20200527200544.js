import React from "react";
import "./App.css";
import MenuAppBar from "./component/MenuAppBar";
import TablenonJSF from "./model/tablenonJSF";
import { Grid, Container } from "@material-ui/core";
{/* <input defaultValue={balance} onChange={(e) => balance = parseFloat(e.target.value) } type="number" /> */}
function App() {
  

  return (
    <div>
      <MenuAppBar></MenuAppBar>
      <div align="center">
        <h1>Shortest Jop First Scheduling (Non-Preemptive)</h1>
        
       
      </div>
      <Container maxWidth="xl">
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
          
          <TablenonJSF></TablenonJSF>
          
          
      </Grid>
      </Container>
      
    </div>
  );
}

export default App;
