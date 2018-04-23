import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';
import { Alarm } from '@material-ui/icons';

export default () => {
  return (
    <AppBar
    // position="fixed"
    >
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-around'
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
