import React, { Component } from 'react';
import { Content, Form, Button, Text, Card } from 'native-base';
import { FormInput } from './FormInput';
import firebase from 'firebase';
import FireAuth from 'react-native-firebase-auth';

class LoginForm extends Component {

  constructor(){
    super();
    FireAuth.init( {iosClientId: '292158142746-6noqgqae1mmvf1lk521lbu1ug5hlcskc.apps.googleusercontent.com'} );
  }

  state = {
    email: '',
    password: ''
  };

  onGoogleButtonPress(){
    FireAuth.googleLogin();
  }

  onFacebookButtonPress(){
    FireAuth.facebookLogin();
  }
  onButtonPress() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
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
                            secureTextEntry
                        />
                    </Card>
                    <Card>
                        <Button full success onPress={this.onButtonPress.bind(this)}>
                            <Text>Log in</Text>
                        </Button>
                        <Button full info onPress={this.onGoogleButtonPress.bind(this)}>
                            <Text>Log in with Google</Text>
                        </Button>
                      <Button full info onPress={this.onFacebookButtonPress.bind(this)}>
                        <Text>Log in with Facebook</Text>
                      </Button>
                    </Card>
                  </Form>
                </Content>
        );
    }
}
export default LoginForm;
