import React from "react";
import { Alarm } from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default () => {
  return (
    <AppBar
    // position="fixed"
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <Alarm />
        <Typography variant="title" color="inherit">
          Pomodoro
        </Typography>
        <Typography variant="subheading" color="inherit">
          Let's be productive!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
