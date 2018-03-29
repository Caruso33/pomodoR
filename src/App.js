import React, { Component } from 'react';
import './App.css';
import Beep from './sound.wav';
const countdown = require('countdown');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workMinutes: 1,
      shortBreakMinutes: 5,
      longBreakMinutes: 10
    };
  }
  addMinutes(minutes) {
    return new Date(new Date().getTime() + minutes * 60000);
  }
  componentDidMount() {
    const workDeadline = this.addMinutes(this.state.workMinutes);
    const shortBreakDeadline = this.addMinutes(this.state.shortBreakMinutes);
    const longBreakDeadline = this.addMinutes(this.state.longBreakMinutes);

    const timerId = countdown(
      workDeadline,
      function(ts) {
        document.getElementById('countdown').innerHTML = ts.toHTML('strong');

        if (ts.hours === 0 && ts.minutes === 0 && ts.seconds === 0) {
          window.clearInterval(timerId);
          const audio = new Audio(Beep);
          audio.play();
        }
      },
      countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }
  render() {
    return (
      <div>
        <header>
          <h1>Pomodoro</h1>
          <span id="countdown" />
        </header>
      </div>
    );
  }
}

export default App;
