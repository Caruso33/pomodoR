import React from 'react';
import { BottomNavigation, BottomNavigationAction } from 'material-ui';
import {
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon
} from 'material-ui-icons';
export default () => {
  return (
    <BottomNavigation
      value={0}
      // onChange={this.handleChange}
      showLabels
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};
