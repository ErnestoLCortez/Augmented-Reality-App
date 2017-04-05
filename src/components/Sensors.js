// (mostly) as pulled from react-native-sensors README file.
import ReactNativeSensors from 'react-native-sensors';

const accelerationObservable = new ReactNativeSensors.Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

// Normal RxJS functions
accelerationObservable
  .map(({ x, y, z }) => x + y + z)
  .filter(speed => speed > 20)
  .subscribe(speed => console.log(`You moved your phone with ${speed}`));

setTimeout(() => {
  accelerationObservable.stop();
}, 1000);
