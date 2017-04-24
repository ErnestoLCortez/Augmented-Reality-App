'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Fab, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput } from '../FormInput';
import Modal from 'react-native-simple-modal';
import { savePost } from '../../actions/apiAuth';


export default class ModalForMessage extends Component {
  state = {
    open: false,
    message: '',
    active: false
  };

  constructor(props){
    super(props);
    this.state = {
      latitude: 'unknown',
      longitude: 'unknown',
      lastPosition: 'unknown',
      active: false
    }
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
        savePost({
          "name": "CameraView_Test",
          "longitude": this.state.longitude,
          "latitude": this.state.latitude,
          "content": this.state.message
        });  //TODO: Need to validate post success
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      //Turns json to string for setting lastPosition state
      var lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }
  render() {
    return (
      <View style={ styles.viewStyle }>
        {this.props.children}
        <Fab
          active={ this.state.active }
          direction="up"
          style={ nativeStyles.fabStyle }
          containerStyle={ nativeStyles.containerStyle }
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-add" />
          <Button
            style={ nativeStyles.buttonStyle }
            onPress={() => this.setState({ open: true })}>
            <Icon name="ios-star-half" style={ nativeStyles.iconStyle }/>
          </Button>
        </Fab>
        <Modal
          offset={ this.state.offset }
          open={ this.state.open }
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({ open: false })}
          style={ styles.modalStyle }>
          <View>
            <FormInput
              labelProp='enter a message'
              value={this.state.message}
              onChangeText={ message => this.setState({ message })}
            />
            <Button onPress={() => {
              this.setState({ open: false });
              this.testGPSButtonPress();
              Toast.show({
                text: 'Your message has been posted.',
                position: 'bottom',
                buttonText: 'YAY'
              })
            }}>
              <Text>PostAR</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const nativeStyles = {
  buttonStyle: {
    backgroundColor: '#000000'
  },
  containerStyle: {
    bottom: 100
  },
  fabStyle: {
    backgroundColor: '#000000',
    marginBottom: 25 ,
  },
  iconStyle: {
    fontSize: 40,
    color: '#FFFFFF'
  },
  modalStyle: {
    alignItems: 'center'
  },
};