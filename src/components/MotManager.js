import React, { Component } from 'react';
import { StyleSheet, Text,View} from 'react-native';

import RNSensors from 'react-native-sensors';
const { Accelerometer, Gyroscope } = RNSensors;
const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

const gyroscopeObservable = new Gyroscope({
  updateInterval: 2000, // defaults to 100ms
});

export default class MotManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceleration: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      },
      gyroscope: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      }
    };
  }

  componentWillMount() {
    accelerationObservable
      .subscribe(acceleration => this.setState({
        acceleration,
      }));

    gyroscopeObservable
      .subscribe(gyroscope => this.setState({
        gyroscope,
      }));
  }

  render() {
    const {
      acceleration,
      gyroscope,
    } = this.state;

    return (
      <View>
        <Text>
          Acceleration:
        </Text>
        <Text>
          {acceleration.x + '/' + acceleration.y + '/' + acceleration.z}
        </Text>
        <Text>
          Gyroscope:
        </Text>
        <Text>
          {gyroscope.x + '/' + gyroscope.y + '/' + gyroscope.z}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    accelerationObservable.stop();
    gyroscopeObservable.stop();
  }
}
