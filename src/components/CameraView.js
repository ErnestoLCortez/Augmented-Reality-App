'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { Container, Content, Toast } from 'native-base';
import Camera from 'react-native-camera';

class BasicCamera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default class CameraView extends Component {
    render() {
        return (
            <Container>
                <BasicCamera />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={()=> Toast.show({
                        text: 'Whoop!',
                        position: 'bottom'
                    });
                }>
            </Container>
        );
    }
}
