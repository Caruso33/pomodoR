import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from 'material-ui';
import { Work, FreeBreakfast, Landscape } from '@material-ui/icons';

// const styles = {};

export default ({ handleChangeCountdownTime, selectedIcon }) => {
  return (
    <Paper
      style={{
        padding: '20px 0px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: 96,
        width: '100%'
      }}
    >
      <BottomNavigation
        value={selectedIcon}
        // onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction
          label="Productive"
          icon={<Work />}
          onClick={() => handleChangeCountdownTime(25, 0)}
        />
        <BottomNavigationAction
          label="Short-break"
          icon={<FreeBreakfast />}
          onClick={() => handleChangeCountdownTime(5, 1)}
        />
        <BottomNavigationAction
          label="Long-break"
          icon={<Landscape />}
          onClick={() => handleChangeCountdownTime(10, 2)}
        />
      </BottomNavigation>
    </Paper>
  );
};
