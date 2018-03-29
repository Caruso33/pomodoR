import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Countdown from './components/Countdown';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Countdown />
        <Footer />
      </div>
    );
  }
}

export default App;
