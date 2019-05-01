import React from "react";
import { Work, FreeBreakfast, Landscape } from "@material-ui/icons";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Paper from "@material-ui/core/Paper";

export default ({ handleChangeCountdownTime, selectedIcon }) => {
  return (
    <Paper
      style={{
        padding: "20px 0px",
        position: "fixed",
        left: 0,
        bottom: 0,
        height: 96,
        width: "100%"
      }}
    >
      <BottomNavigation value={selectedIcon} showLabels>
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
