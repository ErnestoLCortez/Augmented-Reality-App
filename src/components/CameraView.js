'use strict';
import React, { Component } from 'react';
import { Container } from 'native-base';
import ModalForMessage from './CameraViewParts/ModalForMessage';
import BasicCamera from './CameraViewParts/BasicCamera';
import ArObject from './ArObject';
import { connect } from 'react-redux';
import { addArObject, clearArObjects, updateGyroData } from '../actions/augmented';


var gyroscopeObservable;
class CameraView extends Component {

  constructor(props) {
    super(props);
    gyroscopeObservable = require('../lib/sensors').gyroscopeObservable();
    this.renderARObjects = this.renderARObjects.bind(this);
    this.pullARObjects();
  }

  componentDidMount() {
    //this.props.clearArObjects();
    gyroscopeObservable.subscribe(this.props.updateGyroData);
  }
  componentWillUnmount() {
    gyroscopeObservable.stop();
    this.props.clearArObjects();
  }
  componentDidUpdate(prevProps, prevState) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.arObjects.length != nextProps.arObjects.length
    );
  }
  pullARObjects() {
    this.props.addArObject({
      imageUrl: '../assets/images/marker.png',
      startingPosX: 40,
      startingPosY: 40
    });
  }

  renderARObjects(){
    if(this.props.arObjects){
      return this.props.arObjects.map((arObj, i) => {
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
              this.renderARObjects()
            }
          </BasicCamera>
        </ModalForMessage>
      </Container>
    );
  }
}

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