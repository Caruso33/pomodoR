import React from 'react';
import { BottomNavigation, BottomNavigationAction } from 'material-ui';
import { Work, FreeBreakfast, Landscape } from '@material-ui/icons';
export default () => {
  return (
    <BottomNavigation
      value={0}
      // onChange={this.handleChange}
      showLabels
    >
      <BottomNavigationAction
        // style={{ height: 50 }}
        label="Productive"
        icon={<Work />}
      />
      <BottomNavigationAction label="Short-break" icon={<FreeBreakfast />} />
      <BottomNavigationAction label="Long-break" icon={<Landscape />} />
    </BottomNavigation>
  );
};
