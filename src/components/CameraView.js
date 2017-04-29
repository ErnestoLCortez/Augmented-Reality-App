'use strict';
import React, { Component } from 'react';
import { StyleSheet, DeviceEventEmitter, NativeModules } from 'react-native';
import { Container } from 'native-base';
import ModalForMessage from './CameraViewParts/ModalForMessage';
import BasicCamera from './CameraViewParts/BasicCamera';
import ArObject from './ArObject';

var SensorManager = NativeModules.SensorManager;

import {
  GYRO_MOVE_THRESHOLD_X,
  GYRO_MOVE_THRESHOLD_Y,
  MOVE_FACTOR_X,
  MOVE_FACTOR_Y,
} from '../constants';
import { connect } from 'react-redux';
import { addArObject, clearArObjects, updateGyroData } from '../actions/augmented';
import { mixins, variables } from '../constants';

class CameraView extends Component {

  constructor(props) {
    super(props);

    SensorManager.startGyroscope(50);
    this.handleGameStart();
    this.renderARObjects = this.renderARObjects.bind(this);
  }

  componentDidMount() {
    //this.props.clearArObjects();

    //gyroscopeObservable.map((x, y, z) => updateGyroData({x, y, z}));
    DeviceEventEmitter.addListener('Gyroscope', this.props.updateGyroData);
  }
  componentWillUnmount() {
    //gyroscopeObservable.stop();
    this.props.clearArObjects();
    SensorManager.stopGyroscope();
    // timer.clearInterval(this, 'arObjectGenerator');
    // timer.clearInterval(this, 'countdown');
  }
  componentDidUpdate(prevProps, prevState) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.arObjects.length != nextProps.arObjects.length
    );
  }
  handleGameStart() {
    this.startArObjectTimer();
  }
  startArObjectTimer() {

    //let startingPosX = Math.random() * variables.SCREEN_WIDTH * (Math.random() > 0.5 ? -1 : 1) + (variables.SCREEN_WIDTH * .5);
    //let startingPosY = Math.random() * variables.SCREEN_HEIGHT * .75 * (Math.random() > 0.5 ? -1 : 1) + (variables.SCREEN_HEIGHT * .8);

    this.props.addArObject({
      imageUrl: '../assets/images/marker.png',
      startingPosX: 40,
      startingPosY: 40
    });
  }

  renderARObjects(){
    console.log('renderARObjects********************');
    console.log(this.props.arObjects);
    if(this.props.arObjects){
      console.log('***RENDERING AROBJECT****');
      this.props.arObjects.map((arObj, i) => {
        return (
          <ArObject
            key={i}
            //index={i}
            //imageUrl={arObj.imageUrl}
            startingPosX={arObj.startingPosX}
            startingPosY={arObj.startingPosY}
          />
        );
      });
    }
  }

  render() {
    return (
      <Container>
        <ModalForMessage>
          <BasicCamera>
            {
              this.props.arObjects.map((arObj, i) => {
                return (
                  <ArObject
                    key={'arObject-' + i}
                    index={i}
                    imageUrl={arObj.imageUrl}
                    startingPosX={arObj.startingPosX}
                    startingPosY={arObj.startingPosY}
                  />
                );
              })
            }
          </BasicCamera>
        </ModalForMessage>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  root: {
    ...mixins.defaultPage,
    ...mixins.column
  },
  arDisplay: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1
  },
  preview: {
    position: 'absolute',
    height: variables.SCREEN_HEIGHT,
    width: variables.SCREEN_WIDTH
  },
});

function mapStateToProps({ augmented }) {
  return {
    ...augmented,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addArObject: (arObj) => dispatch(addArObject(arObj)),
    clearArObjects: () => dispatch(clearArObjects()),
    updateGyroData: (data) => dispatch(updateGyroData(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraView);