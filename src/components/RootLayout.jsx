import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
const RootLayout = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>

        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
