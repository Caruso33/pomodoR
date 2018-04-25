import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Countdown from './components/Countdown';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

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
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Countdown currentCountdown={this.state.currentCountdown} />
          <Footer
            selectedIcon={this.state.selectedIcon}
            handleChangeCountdownTime={this.handleChangeCountdownTime}
          />
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
