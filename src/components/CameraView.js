'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import ModalForMessage from './CameraViewParts/ModalForMessage';
import BasicCamera from './CameraViewParts/BasicCamera';

export default class CameraView extends Component {
    render() {
        return (
            <Container>


                <ModalForMessage>
                  <BasicCamera/>
                </ModalForMessage>

            </Container>
        );
    }
}
