import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
function ServiceDetails() {
  return (
    <Box sx={{ height: "100%", background: "#f2f2f7", padding: "1rem" }}>
      <Grid container>
        <Grid item xs={3}>
          <LeftSidebar />
        </Grid>
        <Grid item xs={8}>
          <RightSidebar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServiceDetails;
