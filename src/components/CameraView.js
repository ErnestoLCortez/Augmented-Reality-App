'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Button, Text, Card, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Camera from 'react-native-camera';
import { FormInput } from './FormInput';
import Modal from 'react-native-simple-modal';

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

class ModalForMessage extends Component {
  state = {
    open: false,
    message: '',
    active: 'false'
  };

  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BasicCamera/>
      <Fab
          active={this.state.active}
          direction="down"
          containerStyle={{ marginTop: 30 }}
          style={{ backgroundColor: '#000000' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-add" />
          <Button rounded dark onPress={() => this.setState({open: true})}>
              <Icon name="ios-add" />
          </Button>
      </Fab>
      <Modal
        offset={this.state.offset}
        open={this.state.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({open: false})}
        style={{alignItems: 'center'}}>
          <View>
              <FormInput
                  labelProp='enter a message'
                  value={this.state.message}
                  onChangeText={ message => this.setState({ message }) }
              />
              <Button rounded dark buttonText="Post" onPress={() => this.setState({open: false})}/>
          </View>
      </Modal>
    </View>
    );
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
  }
});

export default class CameraView extends Component {
    render() {
        return (
            <Container>
                <ModalForMessage />
            </Container>
        );
    }
}
