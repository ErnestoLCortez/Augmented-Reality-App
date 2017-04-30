import React, { Component } from 'react';
import { Text,View} from 'react-native';
import { accelerationObservable } from '../lib/sensors';
var gyroscopeObservable = require('../lib/sensors').gyroscopeObservable();

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

    if(gyroscopeObservable) {
      gyroscopeObservable
        .subscribe(gyroscope => this.setState({
          gyroscope,
        }));
    }
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
          {gyroscopeObservable ? gyroscope.x + '/' + gyroscope.y + '/' + gyroscope.z : 'Gyroscope not found!'}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    accelerationObservable.stop();
    if(gyroscopeObservable){
      gyroscopeObservable.stop();
    }
  }
}
