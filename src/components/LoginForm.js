import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Card } from 'native-base';
import { FormInput } from './FormInput';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  onButtonPress() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }


  onGoogleButtonPress() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        alert(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  render() {
        return (
                <Content>
                  <Form>
                  <Card>
                      <FormInput
                          labelProp='email'
                          value={this.state.email}
                          onChangeText={ email => this.setState({ email }) }
                      />
                  </Card>
                  <Card>
                      <FormInput
                          labelProp='password'
                          value={this.state.password}
                          onChangeText={ password => this.setState({ password }) }
                      />
                  </Card>
                        <Card>
                            <Button full success onPress={this.onButtonPress.bind(this)}>
                                <Text>Log in</Text>
                            </Button>
                            <Button full info onPress={this.onGoogleButtonPress.bind(this)}>
                                <Text>Log in with Google</Text>
                            </Button>
                        </Card>
                    </Form>
                </Content>
        );
    }
}
export default LoginForm;
