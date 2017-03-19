import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Card } from 'native-base';
import { FormInput } from './FormInput';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };

  render() {
        return (
                <Content>
                  <Form>
                  <Card>
                      <FormInput
                          labelProp='email'
                          value={this.state.email}
                          onChangeText={ emailText => this.setState({ email }) }
                      />
                  </Card>
                  <Card>
                      <FormInput
                          labelProp='password'
                          value={this.state.password}
                          onChangeText={ passwordText => this.setState({ password }) }
                      />
                  </Card>
                        <Card>
                            <Button full success>
                                <Text>Log In</Text>
                            </Button>
                        </Card>
                    </Form>
                </Content>
        );
    }
}
export default LoginForm;
