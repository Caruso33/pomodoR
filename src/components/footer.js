import React from 'react';
import { BottomNavigation, BottomNavigationAction } from 'material-ui';
import { Work, FreeBreakfast, Landscape } from '@material-ui/icons';

const styles = {
  BottomIcons: {
    margin: 40
  }
};

export default ({ handleChangeCountdownTime, selectedIcon }) => {
  return (
    <BottomNavigation
      value={selectedIcon}
      // onChange={this.handleChange}
      showLabels
    >
      <BottomNavigationAction
        style={styles.BottomIcons}
        label="Productive"
        icon={<Work />}
        onClick={() => handleChangeCountdownTime(25, 0)}
      />
      <BottomNavigationAction
        style={styles.BottomIcons}
        label="Short-break"
        icon={<FreeBreakfast />}
        onClick={() => handleChangeCountdownTime(5, 1)}
      />
      <BottomNavigationAction
        style={styles.BottomIcons}
        label="Long-break"
        icon={<Landscape />}
        onClick={() => handleChangeCountdownTime(10, 2)}
      />
    </BottomNavigation>
  );
};
