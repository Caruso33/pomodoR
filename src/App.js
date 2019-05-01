import React, { Component, Fragment } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Countdown from "./components/Countdown";

// import withWidth from "material-ui/utils/withWidth";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCountdown: 25,
      selectedIcon: 0
    };
  }
  handleChangeCountdownTime = (x, y) => {
    this.setState({
      currentCountdown: x,
      selectedIcon: y
    });
  };

  handleChangeTimeManually = time => {
    if (time > 0 && time <= 60) {
      this.setState({
        currentCountdown: time,
        selectedIcon: -1
      });
    }
  };

  render() {
    const { currentCountdown, selectedIcon } = this.state;

    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Countdown
            width={this.props.width}
            currentCountdown={currentCountdown}
            handleChangeTimeManually={this.handleChangeTimeManually}
          />
          <Footer
            selectedIcon={selectedIcon}
            handleChangeCountdownTime={this.handleChangeCountdownTime}
          />
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
