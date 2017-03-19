import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import firebase from 'firebase';
import AppHeader from './components/AppHeader';
import LoginForm from './components/LoginForm';


class App extends Component {
  render() {
    return (
      <Container>
        <AppHeader />
        <LoginForm />
      </Container>
    );
  }
}

export default App;
