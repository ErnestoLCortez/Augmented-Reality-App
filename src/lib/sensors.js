var DeviceInfo = require('react-native-device-info');
import RNSensors from 'react-native-sensors';
import { Platform } from 'react-native';
const { Accelerometer, Gyroscope } = RNSensors;

const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

var gyroscopeObservable = null;

function initializeGyro(){
  gyroscopeObservable = new Gyroscope({
    updateInterval: 2000, // defaults to 100ms
  });
}

if(Platform.OS === 'android') {
  if (!(DeviceInfo.isEmulator())) {
    initializeGyro();
  }
} else {
  initializeGyro();
}

export { accelerationObservable, gyroscopeObservable };