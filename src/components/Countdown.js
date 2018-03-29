import React, { Component } from 'react';
import Beep from '../assets/sound.wav';
import { Paper, Button } from 'material-ui';

const countdown = require('countdown');

const style = {
  display: 'block',
  margin: 20
};

export default class Countdown extends Component {
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
      <Paper style={{ height: 500, paddingTop: 84 }}>
        <h1>Pomodoro</h1>
        <span id="countdown" />
        <div
          sm={6}
          style={{
            paddingTop: 50,
            width: 300,
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Button variant="raised" color="primary">
            Start
          </Button>
          <Button variant="raised" color="secondary">
            Stop
          </Button>
          <Button variant="raised" color="error">
            Reset
          </Button>
        </div>
      </Paper>
    );
  }
}
