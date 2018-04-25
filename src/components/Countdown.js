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
        isRunning: false,
        currentPercentage: 100,
        timerId: 0,
        reminder: 0,
        tsMin: 0,
        tsSec: 0
      };
    }

    initiateCountdown = () => {
      const addMinutes = (minutes, seconds) =>
        new Date(new Date().getTime() + minutes * 60000 + seconds * 1000);

      const { tsMin, tsSec } = this.state;
      const { currentCountdown } = this.props;

      const workDeadline =
        tsMin === 0 && tsSec === 0
          ? addMinutes(currentCountdown, 0)
          : addMinutes(tsMin, tsSec);

      this.setState({
        timerId: countdown(
          workDeadline,
          ts => {
            document.getElementById('countdown').innerHTML = ts.toHTML(
              'strong'
            );
            this.progressCountdown(ts);
            this.checkIfFinished();
          },
          countdown.HOURS | countdown.MINUTES | countdown.SECONDS
        ),
        isRunning: true
      });
    };
    progressCountdown = ts => {
      const timeLeft = ts.minutes * 60 + ts.seconds;
      const currentCountdownSeconds = this.props.currentCountdown * 60;

      this.setState(() => ({
        currentPercentage:
          (currentCountdownSeconds - (currentCountdownSeconds - timeLeft)) /
          currentCountdownSeconds *
          100,
        tsMin: ts.minutes,
        tsSec: ts.seconds
      }));
    };
    checkIfFinished = () => {
      const { tsMin, tsSec } = this.state;

      if (tsMin === 0 && tsSec === 0) {
        const audio = new Audio(Beep);
        audio.play();
        // this.setState({
        //   reminder: setInterval(() => audio.play(), 60000)
        // });
      }
    };

    handleStartPause = () => {
      const { timerId, isRunning, reminder } = this.state;

      window.clearInterval(timerId);
      window.clearInterval(reminder);
      if (!isRunning) {
        // this.setState({   })
        this.initiateCountdown();
      }
      this.setState({
        isRunning: !isRunning
      });
    };
    handleReset = () => {
      const { timerId, reminder } = this.state;

      window.clearInterval(timerId);
      window.clearInterval(reminder);
      this.setState(
        {
          isRunning: false,
          tsMin: 0,
          tsSec: 0
        },
        this.initiateCountdown
      );
    };
    // static getDerivedStateFromProps(nextState, prevState) {
    //   if (nextState.currentCountdown !== prevState.currentCountdown) {
    //     return nextState.currentCountdown;
    //   } else {
    //     return null;
    //   }
    // }

    render() {
      const { classes } = this.props;
      return (
        <Paper style={{ height: '80vh', paddingTop: 84, textAlign: 'center' }}>
          <CircularProgress
            height={50}
            size={150}
            color="secondary"
            variant="static"
            thickness={2}
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
