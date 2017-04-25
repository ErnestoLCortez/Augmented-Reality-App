'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import ModalForMessage from './CameraViewParts/ModalForMessage';
import BasicCamera from './CameraViewParts/BasicCamera';
import ArObject from './arObject';


export default class CameraView extends Component {
  render() {
    return (
      <Container>
        <ModalForMessage>
          <BasicCamera>
            <ArObject
              startingPosX={ 0 }
              startingPosY={ -200 }
              xOffset={ 0 }
              yOffset={ 0 }
            />
          </BasicCamera>
        </ModalForMessage>
      </Container>
    );
  }
}
