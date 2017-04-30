import * as types from '../actions/actionTypes';
import {
  MOVE_FACTOR_X,
  MOVE_FACTOR_Y
} from '../constants';

const initialState = {
  arObjects: [
  ],
  gyroX: 0,
  gyroY: 0,
  xOffset: 0,
  yOffset: 0
};

export default function augmented(state = initialState, action) {
  switch(action.type) {
    case types.ADD_AR_OBJECT:
      return {
        ...state,
        arObjects: [
          ...state.arObjects,
          action.arObject
        ]
      };
    case types.CLEAR_AR_OBJECTS:
      return {
        arObjects: [],
        gyroX: 0,
        gyroY: 0,
        xOffset: 0,
        yOffset: 0
      };
    case types.REMOVE_AR_OBJECT:
      return {
        ...state,
        arObjects: [
          ...state.arObjects.slice(0, action.arObjectIndex),
          ...state.arObjects.slice(action.arObjectIndex + 1)
        ]
      };
    case types.UPDATE_GYRO_DATA:
      return {
        ...state,
        gyroX: action.rotationRate.x,
        gyroY: action.rotationRate.y,
        xOffset: state.xOffset + (action.moveX * (MOVE_FACTOR_X * action.rotationRate.y)),
        yOffset: state.yOffset + (action.moveY * (MOVE_FACTOR_Y * action.rotationRate.x))
      };
    default:
      return state;
  }
}