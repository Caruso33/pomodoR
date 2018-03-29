import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
export default () => {
  const style = {
    display: 'flex',
    justifyContent: 'space-between'
  };
  return (
    <AppBar position="fixed">
      <Toolbar style={style}>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
          Pomodoro
        </Typography>
        <Button color="inherit">Let's be productive!</Button>
      </Toolbar>
    </AppBar>
  );
};
