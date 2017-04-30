var DeviceInfo = require('react-native-device-info');
import RNSensors from 'react-native-sensors';
import { Platform } from 'react-native';
const { Accelerometer, Gyroscope } = RNSensors;

export const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});


export function gyroscopeObservable(){
  if(Platform.OS === 'android') {
    if (!(DeviceInfo.isEmulator())) {
      return initializeGyro();
    }
  } else {
    return initializeGyro();
  }
  return null
}

function initializeGyro(){
  return new Gyroscope({
    updateInterval: 50, // defaults to 100ms
  });
}