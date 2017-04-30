var DeviceInfo = require('react-native-device-info');
import { Platform, NativeModules } from 'react-native';

class Sensor {
  constructor(){
    if(Platform.OS === 'android') {
      this.sensors = NativeModules.SensorManager;
    } else if(Platform.OS === 'ios') {
      this.sensors = require('NativeModules').Gyroscope;
    }
  }

  startGyroscope(interval) {
    if(Platform.OS === 'android') {
      this.sensors.startGyroscope(interval);
    } else if(Platform.OS === 'ios') {
      this.sensors.setGyroUpdateInterval(interval);
      this.sensors.startGyroUpdates();
    }
  }

  stopGyroscope() {
    if(Platform.OS === 'android') {
      this.sensors.stopGyroscope();
    } else if(Platform.OS === 'ios') {
      this.sensors.stopGyroUpdates();
    }
  }
}

export default SensorManager = new Sensor();