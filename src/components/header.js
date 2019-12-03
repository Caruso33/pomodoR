import React from "react";
import { Alarm } from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default () => {
  return (
    <AppBar position="fixed">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <Link
          href="https://caruso33.github.io"
          color="inherit"
          style={{ textDecoration: "underline", fontWeight: "bold" }}
        >
          Visit my homepage
        </Link>

        <Typography variant="h6" color="inherit">
          Pomodoro
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Alarm style={{ marginRight: 10 }} />
          <Typography variant="subtitle1" color="inherit">
            Let's be productive!
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
