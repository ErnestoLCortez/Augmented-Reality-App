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
    message: ''
  };

  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BasicCamera/>
      <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.setState({open: true})}>
        <Icon name="star-half" style={styles.actionButtonIcon} />
      </ActionButton>
      <Modal
        offset={this.state.offset}
        open={this.state.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({open: false})}
        style={{alignItems: 'center'}}>
        <Form>
          <Card>
              <FormInput
                  labelProp='enter a message'
                  value={this.state.message}
                  onChangeText={ email => this.setState({ message }) }
              />
          </Card>
          <Card>
              <Button full success onPress={() => this.setState({open: false})}>
                  <Text>Post</Text>
              </Button>
          </Card>
        </Form>
      </Modal>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  actionButtonIcon: {
    flex:1,
    fontSize: 20,
    height: 22,
    color: 'white',
  },
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
                <ModalForMessage />
            </Container>
        );
    }
}
