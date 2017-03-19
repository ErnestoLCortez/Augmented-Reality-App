import React, { Component } from 'react';
import { View } from 'react-native';
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
      firebase.auth().signInWithEmailAndPassword(email, password);
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
                                <Text>Log In</Text>
                            </Button>
                        </Card>
                    </Form>
                </Content>
        );
    }
}
export default LoginForm;
