import React, { Component } from 'react';
import Beep from '../assets/sound.wav';
import { Paper, Button, Typography } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import { Autorenew, PlayArrow, Pause } from '@material-ui/icons';

const countdown = require('countdown');

const styles = theme => ({
  Button: {
    margin: 40
  }
});

export default withStyles(styles)(
  class Countdown extends Component {
    constructor(props) {
      super(props);
      this.state = {
        workMinutes: 25,
        shortBreakMinutes: 5,
        longBreakMinutes: 10,
        currentCountdown: 25,
        currentPercentage: 0,
        timerId: ''
      };
    }
    addMinutes(minutes) {
      return new Date(new Date().getTime() + minutes * 60000);
    }
    componentDidMount() {
      const workDeadline = this.addMinutes(this.state.workMinutes);
      // eslint-disable-next-line no-unused-vars
      const shortBreakDeadline = this.addMinutes(this.state.shortBreakMinutes);
      // eslint-disable-next-line no-unused-vars
      const longBreakDeadline = this.addMinutes(this.state.longBreakMinutes);
      const { currentCountdown } = this.state;
      const audio = new Audio(Beep);

      const timerId = countdown(
        workDeadline,
        ts => {
          document.getElementById('countdown').innerHTML = ts.toHTML('strong');

          this.getProgressPercent(ts);

          if (ts.hours === 0 && ts.minutes === 0 && ts.seconds === 0) {
            audio.play();
            // eslint-disable-next-line no-unused-vars
            const reminder = setInterval(() => audio.play(), 60000);
          }
        },
        countdown.HOURS | countdown.MINUTES | countdown.SECONDS
      );
    }

    getProgressPercent = ts =>
      this.setState(({ currentCountdown }) => ({
        currentPercentage:
          (currentCountdown - (currentCountdown - ts.minutes)) /
          currentCountdown *
          100
      }));

    handleStartPause = () => {};
    handleReset = () => {
      this.setState({
        timerId: 5
        // window.clearInterval(timerId)
      });
    };

    render() {
      const { classes } = this.props;
      return (
        <Paper style={{ height: '80vh', paddingTop: 84, textAlign: 'center' }}>
          <CircularProgress
            height={50}
            size={150}
            color="primary"
            variant="static"
            thickness={3}
            value={this.state.currentPercentage}
          />
          <Typography
            style={{
              height: 50
              // margin: '150px 0px'
            }}
            variant="display1"
            color="inherit"
            id="countdown"
          />

          <br />
          <Button
            className={classes.Button}
            variant="raised"
            color="primary"
            onClick={this.handleStartPause}
          >
            <PlayArrow style={{ margin: 5 }} />
            Start / Pause
            <Pause style={{ margin: 5 }} />
          </Button>
          <Button
            className={classes.Button}
            variant="raised"
            color="default"
            onClick={this.handleReset}
          >
            <Autorenew style={{ margin: 5 }} />
            Reset
          </Button>
        </Paper>
      );
    }
  }
);
