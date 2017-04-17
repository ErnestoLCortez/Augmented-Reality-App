'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Form, Button, Text, Card, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Camera from 'react-native-camera';
import { FormInput } from './FormInput';
import Modal from 'react-native-simple-modal';
import firebase from 'firebase';

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
    active: false
  };

  constructor(props){
      super(props);
      this.state = {latitude: 'unknown', longitude: 'unknown', lastPosition: 'unknown', active: false}
      //Binds for onclick
      this.testGPSButtonPress = this.testGPSButtonPress.bind(this);
  }
  watchID: ?number = null;

  testGPSButtonPress(event){
      navigator.geolocation.getCurrentPosition(
          (position) => {
              //Sets states from JSON position object
              this.setState({
                  latitude: position['coords']['latitude'],
                  longitude: position['coords']['longitude']
              });
              //Creates var to store details of post
              var postDetails = {
                  "name": "CameraView_Test",
                  "longitude": this.state.longitude,
                  "latitude": this.state.latitude,
                  "content": this.state.message
              };
              var backendtoken = AsyncStorage.getItem('JWT_TOKEN');
              var firebasetoken = AsyncStorage.getItem('ID_TOKEN');
              //Using fetch library to post to backend db using heroku link
              fetch('https://terrasite.herokuapp.com/api/arposts', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'x-access-token': backendtoken,
                      'idtoken': firebasetoken
                  },
                  body: JSON.stringify(postDetails)
              });
          },
          (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
          //Turns json to string for setting lastPosition state
          var lastPosition = JSON.stringify(position);
          this.setState({lastPosition});
      });
  }
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BasicCamera/>
      <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ bottom: 40 }}
          style={{ backgroundColor: '#000000' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-add" />
          <Button onPress={() => this.setState({open: true})}>
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
              <Button onPress={() => this.setState({open: false, }), this.testGPSButtonPress}>
                  <Icon name="ios-add" />
              </Button>
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
