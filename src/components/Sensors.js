// (mostly) as pulled from react-native-sensors README file.
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Accelerometer, Gyroscope, ReactNativeSensors, decorator as sensors } from 'react-native-sensors';


// const accelerationObservable = new ReactNativeSensors.Accelerometer({
//   updateInterval: 100, // defaults to 100ms
// });
//
// // Normal RxJS functions
// accelerationObservable
//   .map(({ x, y, z }) => x + y + z)
//   .filter(speed => speed > 20)
//   .subscribe(speed => console.log(`You moved your phone with ${speed}`));
//
// setTimeout(() => {
//   accelerationObservable.stop();
// }, 1000);


export class MotManager { // no lifecycle needed
  render() {
    const {
      Accelerometer,
      Gyroscope,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Acceleration has value: {Accelerometer}
          Gyro has value: {Gyroscope}
        </Text>
      </View>
    );
  }
}

export default sensors({
  Accelerometer: {
    updateInterval: 300, // optional
  },
  Gyroscope: true,
  Magnetometer: false, // disabled
})(MotManager);
