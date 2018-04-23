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
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Countdown />
          <Footer />
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
