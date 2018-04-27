import React, { Component } from 'react';
import Beep from '../assets/sound.wav';
import { Paper, Button, Typography } from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import {
  Autorenew,
  PlayArrow,
  Pause,
  Timelapse,
  Done
} from '@material-ui/icons';

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
        tsSec: 0,
        manualTime: 0
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

      this.setState(({ currentPercentage }) => ({
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

    componentDidUpdate(prevProps) {
      if (prevProps.currentCountdown !== this.props.currentCountdown) {
        this.handleReset();
      }
    }

    render() {
      const { classes, handleChangeTimeManually } = this.props;
      return (
        <Paper
          style={{
            marginTop: 70,
            paddingTop: 84,
            paddingBottom: 20,
            textAlign: 'center'
          }}
        >
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
              height: 50,
              margin: 80
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
          <form
            noValidate
            autoComplete="off"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
            onSubmit={e => {
              e.preventDefault();
              handleChangeTimeManually(this.state.manualTime);
            }}
          >
            <TextField
              id="time"
              label="How many minutes?"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Timelapse />
                  </InputAdornment>
                )
              }}
              style={{ width: 200, marginRight: 100 }}
              onChange={event => {
                const value = Number(event.target.value);
                if (isNaN(value)) {
                  return;
                } else {
                  this.setState({ manualTime: value });
                }
              }}
              margin="normal"
            />
            <Button
              type="submit"
              color="default"
              variant="raised"
              style={{ width: 50 }}
            >
              <Done />
            </Button>
          </form>
        </Paper>
      );
    }
  }
);
