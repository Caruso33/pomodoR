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
    margin: 10,
    '@media screen and (min-width: 600px)': {
      margin: 20
    }
  },
  Paper: {
    '@media screen and (max-width: 600px)': {
      marginTop: 60
    },
    marginTop: 70,

    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    height: '90vh'
  },
  Typography: {
    height: 50,
    margin: 20
  },
  IconButton: {
    margin: 5
  },
  Form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media screen and (min-width: 360px)': {
      flexDirection: 'row'
    }
  },
  TextField: {
    width: 200,
    margin: 25,
    '@media screen and (min-width: 600px)': {
      margin: 20
    }
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

      const deadline =
        tsMin === 0 && tsSec === 0
          ? addMinutes(currentCountdown, 0)
          : addMinutes(tsMin, tsSec);

      this.setState({
        timerId: countdown(
          deadline,
          ts => {
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
      const { classes, handleChangeTimeManually, width } = this.props;
      return (
        <Paper className={classes.Paper}>
          <CircularProgress
            height={50}
            size={250}
            color="secondary"
            variant="static"
            thickness={1}
            value={this.state.currentPercentage}
            style={{
              position: 'relative',
              top: 15
            }}
          />
          <Typography
            className={classes.Typography}
            variant="display1"
            color="inherit"
            id="countdown"
            style={{
              position: 'relative',
              top: 15
            }}
          >
            {`${this.state.tsMin}min - ${this.state.tsSec}s`}
          </Typography>
          <br />
          <Button
            className={classes.Button}
            variant="raised"
            color="primary"
            onClick={this.handleStartPause}
          >
            <PlayArrow className={classes.IconButton} />
            Start / Pause
            <Pause className={classes.IconButton} />
          </Button>
          <Button
            className={classes.Button}
            variant="raised"
            color="default"
            onClick={this.handleReset}
          >
            <Autorenew className={classes.IconButton} />
            Reset
          </Button>
          <form
            noValidate="noValidate"
            autoComplete="off"
            className={classes.Form}
            onSubmit={e => {
              e.preventDefault();
              handleChangeTimeManually(this.state.manualTime);
            }}
          >
            <TextField
              id="time"
              label="How many minutes?"
              xs={12}
              sm={6}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Timelapse />
                  </InputAdornment>
                )
              }}
              className={classes.TextField}
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
              className={classes.Button}
            >
              <Done />
            </Button>
          </form>
        </Paper>
      );
    }
  }
);
