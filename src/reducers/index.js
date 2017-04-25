import { combineReducers } from 'redux';
import * as augmented from './augmented';

export default combineReducers(Object.assign(
  augmented,
));